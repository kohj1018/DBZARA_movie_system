from django.urls import path

from django.views.generic import TemplateView
from . import views

app_name = 'cinema'


urlpatterns = [
    path('cinemas/', views.cinemas, name='cinema-list'),
    path('schedule/', TemplateView.as_view(template_name='cinema/scheduler.html'), name='schedule'),

    path('api/cinemas/', views.CinemaAPIListView.as_view(), name='api-cinemas'),
    path('api/cinema/<int:pk>/', views.CinemaAPIDetailView.as_view(), name='api-cinema'),
    # TODO: Fix schedules api to get default movies & cinemas
    # path('api/schedules/', views.ScheduleAPIView.as_view(), name='api-reservation-list-cinema'),
    path('api/schedule/cinema/<int:pk>/', views.ScheduleCinemaAPIView.as_view(), name='api-reservation-detail-cinema'),
    path('api/schedule/movie/<int:pk>/', views.ScheduleMovieAPIView.as_view(), name='api-reservation-detail-movie')
]
