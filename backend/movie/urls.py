from django.urls import path
from . import views

app_name = 'movie'

urlpatterns = [
    path('actor/', views.ActorCreateView.as_view(), name='actor-create'),
    path('movies/', views.MovieListView.as_view(), name='movie-list'),
    path('actors/', views.ActorListView.as_view(), name='actor-list'),
    path('directors/', views.DirectorListView.as_view(), name='director-list')
]