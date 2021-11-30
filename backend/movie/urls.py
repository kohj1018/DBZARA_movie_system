from django.urls import path
from . import views

app_name = 'movie'

urlpatterns = [
    path('movies/', views.MovieListView.as_view(), name='movie-list'),
    path('movie/<int:pk>', views.MovieDetailView.as_view(), name='movie-detail'),
    path('actors/', views.ActorListView.as_view(), name='actor-list'),
    path('actor/<int:pk>/', views.ActorDetailView.as_view(), name='actor-detail'),
    path('directors/', views.DirectorListView.as_view(), name='director-list'),
    path('director/<int:pk>/', views.DirectorDetailView.as_view(), name='director-detail'),
    path('distributors/', views.DistributorListView.as_view(), name='distributor-list'),
    path('genres/', views.GenreListView.as_view(), name='genre-list'),
]
