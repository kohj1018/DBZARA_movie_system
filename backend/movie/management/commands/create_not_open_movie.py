from datetime import date, timedelta

from django.core.management.base import BaseCommand
from functions.collect_movie_data import TMDBAPI


class Command(BaseCommand):
    help = 'this commands create user'

    def add_arguments(self, parser):
        parser.add_argument('--days', default=0, type=int)

    def handle(self, *args, **options):
        days = options.get('days')

        kobis = TMDBAPI()


