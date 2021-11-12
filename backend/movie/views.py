from django.shortcuts import render
from django.views.generic import ListView

from .models import Movie, Actor, Director


# Create your views here.
class MovieListView(ListView):
    model = Movie
    context_object_name = 'movies'
    template_name = 'movie/movie_list.html'
    paginate_by = 12


class ActorListView(ListView):
    model = Actor
    context_object_name = 'persons'
    template_name = 'movie/person_list.html'
    paginate_by = 12


class DirectorListView(ListView):
    model = Director
    context_object_name = 'persons'
    template_name = 'movie/person_list.html'
    paginate_by = 12

