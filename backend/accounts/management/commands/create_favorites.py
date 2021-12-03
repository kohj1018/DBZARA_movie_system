from random import sample, randint

from django.core.management.base import BaseCommand

from accounts.models import Profile
from movie.models import Movie, Actor, Director, Distributor, Genre


class Command(BaseCommand):
    help = 'this command create favorite command.'

    def __init__(self):
        super(Command, self).__init__()
        self.profiles = Profile.objects.all()
        self.movies = list(Movie.objects.all())
        self.actors = list(Actor.objects.all())
        self.directors = list(Director.objects.all())
        self.distributors = list(Distributor.objects.all())
        self.genres = list(Genre.objects.all())

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        for profile in self.profiles:
            for actor in sample(self.actors, randint(0, 10)):
                profile.add_favorite_actor(actor)
            for genre in sample(self.genres, randint(0, 5)):
                profile.add_favorite_genre(genre)
            for movie in sample(self.movies, randint(0, 10)):
                profile.add_favorite_movie(movie)
            for director in sample(self.directors, randint(0, 3)):
                profile.add_favorite_director(director)
            for distributor in sample(self.distributors, randint(0, 3)):
                profile.add_favorite_distributor(distributor)
