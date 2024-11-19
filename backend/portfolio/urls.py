# portfolio/urls.py

from django.urls import path
from .views import create_portfolio, add_loan_to_portfolio, receive_installment, list_user_portfolios, list_portfolio_transactions

urlpatterns = [
    path('create/', create_portfolio, name='create_portfolio'),
    path('view/', list_user_portfolios, name='list_user_portfolios'),
    path('<int:portfolio_id>/transactions/', list_portfolio_transactions, name='list_portfolio_transactions'),
    path('<int:portfolio_id>/add_loan/', add_loan_to_portfolio, name='add_loan_to_portfolio'),
    path('<int:portfolio_id>/<int:loan_id>/receive-installment/', receive_installment, name='receive-installment'),
]