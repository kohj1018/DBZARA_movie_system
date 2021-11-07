from datetime import datetime, timedelta
from random import choice

from django.core.management.base import BaseCommand
from cinema.models import Theater

from exception.movie_exception import MovieExistException
from functions.collect_movie_data import KobisAPI


class Command(BaseCommand):
    help = 'this command create user'

    def add_arguments(self, parser):
        parser.add_argument('--days', default=1, type=int)

    def handle(self, *args, **options):
        kobis = KobisAPI()
        schedule_data, base_date = kobis.parse_schedule_data()
        theaters = Theater.objects.all()
        for movie, counts in schedule_data:
            except_count = 0
            for _ in range(counts):
                hour = choice(list(range(1, 3)) + list(range(6, 24)))
                minute = choice(list(range(0, 61, 5)))
                theater, schedule_time = choice(theaters), datetime(year=base_date.year, month=base_date.month, day=base_date.day) + timedelta(hours=hour) + timedelta(minutes=minute)
                try:
                    theater.add_schedule(movie, schedule_time)
                except MovieExistException:
                    except_count += 1
                    continue

            print(f'{movie}: {base_date} 일 {counts - except_count}개 데이터 생성 완료')

