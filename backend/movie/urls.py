from django.urls import path
from . import views

app_name = 'movie'

urlpatterns = [
    path('movies/', views.MovieListView.as_view(), name='movie-list'),
    path('actors/', views.ActorListView.as_view(), name='actor-list'),
    path('directors/', views.DirectorListView.as_view(), name='director-list'),

    path('api/movies/', views.MovieAPIView.as_view(), name='movie-list')
]