from django.urls import path
from django.views.generic import TemplateView

from .views import GoogleLoginView

app_name = 'accounts'

urlpatterns = [
    path('login/google/', GoogleLoginView.as_view(), name='google-login'),
    path('login/', TemplateView.as_view(template_name='accounts/login.html'), name='login')
]