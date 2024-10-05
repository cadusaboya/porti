from django.db import models
from django.conf import settings
from django.utils import timezone

class Portfolio(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='owned_portfolios', on_delete=models.CASCADE)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    current_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Loan(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='loans')
    name = models.CharField(max_length=255)  # Person's name
    value_lent = models.DecimalField(max_digits=10, decimal_places=2)
    monthly_rate = models.DecimalField(max_digits=5, decimal_places=2)  # Percentage, e.g., 5.00 for 5%
    number_of_installments = models.IntegerField()
    start_date = models.DateField(default=timezone.now)  # When the first payment is due

    def calculate_installment_value(self):
        """
        Calculate the installment value based on the loan details.
        Formula: P = A * [r(1+r)^n] / [(1+r)^n – 1]
        Where:
        P = monthly installment payment
        A = principal (loan amount)
        r = monthly interest rate (decimal, e.g., 0.05 for 5%)
        n = number of installments
        """
        principal = self.value_lent
        rate = self.monthly_rate / 100
        n = self.number_of_installments
        
        if rate > 0:
            # Standard amortization formula
            monthly_payment = principal * (rate * (1 + rate) ** n) / ((1 + rate) ** n - 1)
        else:
            # If no interest rate (rate == 0), the payment is just principal divided by installments
            monthly_payment = principal / n
        
        return round(monthly_payment, 2)

    def __str__(self):
        return f"Loan to {self.name} for {self.value_lent} over {self.number_of_installments} installments"

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('LOAN', 'Loan'),
        ('INSTALLMENT', 'Installment Payment'),
    ]

    portfolio = models.ForeignKey('Portfolio', on_delete=models.CASCADE, related_name='transactions')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.get_transaction_type_display()} of {self.amount} for {self.portfolio.name}'