from datetime import datetime, timedelta, date
from random import choice, randint

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from cinema.models import Theater, Schedule, Reservation
from accounts.models import Profile
from item.models import Item
from exception.movie_exception import MovieExistException
from exception.cinema_exception import SeatExistException
from functions.collect_movie_data import KobisAPI


class Command(BaseCommand):
    help = 'this command create user'

    def __init__(self):
        super().__init__()
        self.theaters = Theater.objects.all()
        self.users = get_user_model().objects.all()

    def add_arguments(self, parser):
        parser.add_argument('--days', default=0, type=int)

    def handle(self, *args, **options):
        days = options.get('days')

        kobis = KobisAPI()
        finish_date = kobis.start_date + timedelta(days=days) if days != 0 else date.today()
        while kobis.start_date < finish_date:
            schedule_data, base_date = kobis.parse_schedule_data()
            for movie, show_counts, audience_counts in schedule_data:
                except_count = 0
                while Schedule.objects.filter(movie=movie, datetime__day=base_date.day, datetime__month=base_date.month).count() <= show_counts:
                    for _ in range(show_counts):
                        hour = choice(list(range(1, 3)) + list(range(8, 24)))
                        minute = choice(list(range(0, 56, 5)))
                        theater, schedule_time = choice(self.theaters), datetime(year=base_date.year, month=base_date.month, day=base_date.day) + timedelta(hours=hour) + timedelta(minutes=minute)
                        try:
                            schedule = theater.add_schedule(movie, schedule_time)
                            while Reservation.objects.get(schedule=schedule.id).count() <= audience_counts // show_counts:
                                profile = Profile.objects.get(user=choice(self.users))

                                try:
                                    Reservation.create(
                                        profile=profile,
                                        schedule=schedule.id,
                                        item=Item.get_ticket(age=profile.user.age, hour=hour),
                                        coupon=None,
                                        non_coupon=None,
                                        column=randint(0, theater.seat.columns),
                                        row=randint(0, theater.seat.rows)
                                    )
                                except SeatExistException:
                                    continue

                        except MovieExistException:
                            except_count += 1

                print(f'{base_date} 일: <<{movie}>> {show_counts - except_count}개 데이터 생성 완료')

            kobis.start_date += timedelta(days=1)


