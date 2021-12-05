from django.urls import path

from . import views

app_name = 'cinema'

urlpatterns = [
    path('cinemas/', views.cinemas, name='cinema-list'),
    path('schedule/', views.cinema_schedule_list_view, name='schedule'),
    path('stock/', views.cinema_stock_list_view, name='stock-list'),
]
