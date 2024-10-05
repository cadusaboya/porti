# portfolio/views.py

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import PortfolioSerializer, LoanSerializer
from .models import Portfolio, Loan, Transaction
from decimal import Decimal

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_portfolio(request):
    # Serialize the request data, ensuring 'owner' is the logged-in user
    data = request.data.copy()  # Make a mutable copy of request data
    data['owner'] = request.user.id  # Add the logged-in user as the owner
    
    # Use the modified data to create the portfolio
    serializer = PortfolioSerializer(data=data)
    
    # Check if the data is valid
    if serializer.is_valid():
        # Save the portfolio, with 'owner' as the logged-in user and handle 'users' field for members
        portfolio = serializer.save()
        
        # Return the serialized portfolio data
        response_data = {'data': serializer.data, 'message': 'Portfolio created successfully'}
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_loan_to_portfolio(request, portfolio_id):
    try:
        portfolio = Portfolio.objects.get(id=portfolio_id)
    except Portfolio.DoesNotExist:
        return Response({'error': 'Portfolio not found'}, status=status.HTTP_404_NOT_FOUND)
    
    data = request.data
    data['portfolio'] = portfolio.id  # Associate the loan with the portfolio
    serializer = LoanSerializer(data=data)
    
    if serializer.is_valid():
        loan_value = Decimal(data.get('value_lent'))  # Get the value_lent from the request

        # Check if the portfolio has enough balance
        if portfolio.current_balance < loan_value:
            return Response(
                {'error': 'Insufficient balance in portfolio to make this loan.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Save the loan
        loan = serializer.save()

        # Deduct the loan amount from the portfolio balance
        portfolio.current_balance -= loan_value
        portfolio.save()

        # Create a transaction for the loan
        Transaction.objects.create(
            portfolio=portfolio,
            user=request.user,
            transaction_type='LOAN',
            amount=loan_value
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def receive_installment(request, portfolio_id, loan_id):
    try:
        portfolio = Portfolio.objects.get(id=portfolio_id)
    except Portfolio.DoesNotExist:
        return Response({'error': 'Portfolio not found'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the logged-in user is a member of this portfolio
    if not portfolio.members.filter(id=request.user.id).exists():
        return Response({'error': 'You are not a member of this portfolio'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        loan = Loan.objects.get(id=loan_id, portfolio=portfolio)
    except Loan.DoesNotExist:
        return Response({'error': 'Loan not found for this portfolio'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    installment_amount = data.get('amount', 0)
    if not installment_amount or Decimal(installment_amount) <= 0:
        return Response({'error': 'Invalid installment amount'}, status=status.HTTP_400_BAD_REQUEST)

    installment_amount = Decimal(installment_amount)
    
    # Calculate interest and principal portions
    interest_amount = loan.value_lent * loan.monthly_rate / 100  # Example: 5% interest
    principal_payment = installment_amount - interest_amount

    if loan.number_of_installments <= 0:
        return Response({'error': 'No remaining installments'}, status=status.HTTP_400_BAD_REQUEST)

    if principal_payment > installment_amount:
        return Response({'error': 'Installment exceeds remaining loan balance'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Update the loan's remaining amount and remaining installments
    loan.value_lent -= principal_payment  # Deduct only the principal part
    loan.number_of_installments -= 1
    loan.save()

    # Update the portfolio balance with the entire installment amount (principal + interest)
    portfolio.current_balance += installment_amount
    portfolio.save()

    # Create a transaction for the installment payment
    Transaction.objects.create(
        portfolio=portfolio,
        user=request.user,
        transaction_type='INSTALLMENT',
        amount=installment_amount  # Record the full installment (principal + interest)
    )

    # Serialize the updated loan and return the response
    serializer = LoanSerializer(loan)
    return Response(serializer.data, status=status.HTTP_200_OK)