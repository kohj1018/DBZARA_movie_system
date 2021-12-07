from datetime import date, timedelta

from django.core.management.base import BaseCommand

from functions.crawling_movie_review import CrawlingMovieReview
from movie.models import Movie, Review


class Command(BaseCommand):
    help = 'this commands create review'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        movies = Movie.objects.all().order_by('-id')
        for movie in movies:
            if Review.objects.filter(movie=movie).count() == 0:
                naver_movie = CrawlingMovieReview()
                code = naver_movie.get_movie_code_by_title(movie.name)
                naver_movie.get_comment_by_code(code, movie)
