from django.views.generic import ListView

from movie.models import Movie, Actor, Director, Distributor, Genre
# Create your views here.


class MovieListView(ListView):
    model = Movie
    context_object_name = 'movies'
    paginate_by = 15


class ActorListView(ListView):
    model = Actor
    context_object_name = 'persons'
    template_name = 'movie/person_list.html'
    paginate_by = 12

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(ActorListView, self).get_context_data(**kwargs)
        context['type'] = 'actor'
        return context


class DirectorListView(ListView):
    model = Director
    context_object_name = 'persons'
    template_name = 'movie/person_list.html'
    paginate_by = 12

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(DirectorListView, self).get_context_data(**kwargs)
        context['type'] = 'director'
        return context


class DistributorListView(ListView):
    model = Distributor
    context_object_name = 'distributors'
    paginate_by = 13

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(DistributorListView, self).get_context_data(**kwargs)
        context['title'] = '배급사'
        return context


class GenreListView(ListView):
    model = Genre
    context_object_name = 'genres'
    paginate_by = 13

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(GenreListView, self).get_context_data(**kwargs)
        context['title'] = '장르'
        return context
