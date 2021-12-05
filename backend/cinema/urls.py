from django.urls import path
from django.views.generic import TemplateView

from . import views

app_name = 'cinema'

urlpatterns = [
    path('cinemas/', views.cinemas, name='cinema-list'),
    path('schedule/', TemplateView.as_view(template_name='cinema/scheduler.html'), name='schedule'),

]
