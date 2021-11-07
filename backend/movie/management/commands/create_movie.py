from datetime import date, timedelta

from django.core.management.base import BaseCommand
from functions.collect_movie_data import KobisAPI


class Command(BaseCommand):
    help = 'this command create user'

    def add_arguments(self, parser):
        parser.add_argument('--days', default=1, type=int)

    def handle(self, *args, **options):
        days = options.get('days')

        kobis = KobisAPI()

        finish_date = kobis.start_date + timedelta(days=days - 1) if days != 0 else date.today()
        while kobis.start_date < finish_date:
            kobis.parse_movie_data()
            print(f'{kobis.start_date} 데이터 생성 완료')
