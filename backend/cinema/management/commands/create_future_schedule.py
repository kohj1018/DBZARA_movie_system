from datetime import datetime, timedelta, date
from random import choice, randint

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from movie.models import Movie
from cinema.models import Theater, Schedule, Reservation
from accounts.models import Profile
from item.models import Item
from exception.movie_exception import MovieExistException
from exception.cinema_exception import SeatExistException
from functions.crawling_movie_age_rate import CrawlingMovieAgeRate


class Command(BaseCommand):
    help = 'this commands create user'

    def __init__(self):
        super().__init__()
        self.theaters = Theater.objects.filter(category='2D')
        self.movies = Movie.objects.all()

    def add_arguments(self, parser):
        parser.add_argument('--days', default=0, type=int)

    def handle(self, *args, **options):
        days = options.get('days')

        start_date = date.today()
        end_date = date.today() + timedelta(days=14)

        while start_date < end_date:
            show_counts = randint(30, 70)
            movie_set = self.movies.filter(closing_date__gt=start_date)
            for movie in movie_set:
                for _ in range(show_counts):
                    hour = choice(list(range(1, 3)) + list(range(8, 24)))
                    minute = choice(list(range(0, 56, 5)))
                    theater, schedule_time = choice(self.theaters), datetime(year=start_date.year,
                                                                             month=start_date.month,
                                                                             day=start_date.day) + timedelta(
                        hours=hour) + timedelta(minutes=minute)
                    try:
                        schedule = theater.add_schedule(movie, schedule_time)
                    except MovieExistException:
                        continue

            start_date += timedelta(days=1)


