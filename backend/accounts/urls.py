from django.urls import path
from django.views.generic import TemplateView
from . import views


app_name = 'accounts'

urlpatterns = [
    path('login/', TemplateView.as_view(template_name='accounts/login.html'), name='login'),
    path('employees/', views.employee_list_view, name='employee-list'),
    path('attendance/', views.employee_attendance_list_view, name='attendance-list'),
    path('evaluate/', views.employee_evaluate_list_view, name='evaluate-list'),
]
