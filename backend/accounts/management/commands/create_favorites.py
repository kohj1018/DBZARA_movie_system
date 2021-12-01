from random import sample, randint

from django.core.management.base import BaseCommand

from accounts.models import Profile
from movie.models import Movie, Actor, Director, Distributor, Genre


class Command(BaseCommand):
    help = 'this command create favorite command.'

    def __init__(self):
        super(Command, self).__init__()
        self.profiles = Profile.objects.all()
        self.movies = Movie.objects.all()
        self.actors = Actor.objects.all()
        self.directors = Director.objects.all()
        self.distributors = Distributor.objects.all()
        self.genres = Genre.objects.all()

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        for profile in self.profiles:
            profile.add_favorite_actor(sample(self.actors, randint(0, 10)))
            profile.add_favorite_genre(sample(self.genres, randint(0, 5)))
            profile.add_favorite_movie(sample(self.movies, randint(0, 10)))
            profile.add_favorite_director(sample(self.directors, randint(0, 3)))
            profile.add_favorite_distributor(sample(self.distributors, randint(0, 3)))
