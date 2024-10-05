# portfolio/urls.py

from django.urls import path
from .views import create_portfolio, add_loan_to_portfolio, receive_installment

urlpatterns = [
    path('create/', create_portfolio, name='create_portfolio'),
    path('<int:portfolio_id>/add_loan/', add_loan_to_portfolio, name='add_loan_to_portfolio'),
    path('<int:portfolio_id>/<int:loan_id>/receive-installment/', receive_installment, name='receive-installment'),
]