from django.views.generic import DetailView
from movie.models import Actor, Director, Movie


class MovieDetailView(DetailView):
    model = Movie


class ActorDetailView(DetailView):
    model = Actor
    context_object_name = 'person'
    template_name = 'movie/person_detail.html'


class DirectorDetailView(DetailView):
    model = Director
    context_object_name = 'person'
    template_name = 'movie/person_detail.html'
