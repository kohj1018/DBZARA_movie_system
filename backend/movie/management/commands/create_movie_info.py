from datetime import date, timedelta

from django.core.management.base import BaseCommand

from movie.models import MovieInfo, Movie


class Command(BaseCommand):
    help = 'this commands create movie info'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):

        # Create MovieInfo
        movies = Movie.objects.all()
        for movie in movies:
            MovieInfo.create(movie)

        # Update MovieInfo
        movie_infos = MovieInfo.objects.all().order_by('-id')
        for movie_info in movie_infos:
            movie_info.update()
