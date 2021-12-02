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
from functions.crawling_movie_age_rate import CrawlingMovieAgeRate


class Command(BaseCommand):
    help = 'this command create user'

    def __init__(self):
        super().__init__()
        self.theaters = Theater.objects.filter(category='2D')
        self.kobis = KobisAPI()
        self.naver_movie = CrawlingMovieAgeRate()

    def add_arguments(self, parser):
        parser.add_argument('--days', default=0, type=int)

    def handle(self, *args, **options):
        days = options.get('days')

        finish_date = self.kobis.start_date + timedelta(days=days) if days != 0 else date.today()
        while self.kobis.start_date < finish_date:
            schedule_data, base_date = self.kobis.parse_schedule_data()
            for movie, show_counts, audience_counts in schedule_data:
                except_count = 0
                while Schedule.objects.filter(movie=movie, datetime__day=base_date.day, datetime__month=base_date.month).count() <= show_counts:
                    if show_counts == 0:
                        show_counts = 1

                    for _ in range(show_counts):
                        hour = choice(list(range(1, 3)) + list(range(8, 24)))
                        minute = choice(list(range(0, 56, 5)))
                        theater, schedule_time = choice(self.theaters), datetime(year=base_date.year, month=base_date.month, day=base_date.day) + timedelta(hours=hour) + timedelta(minutes=minute)
                        try:
                            schedule = theater.add_schedule(movie, schedule_time)
                            counts = theater.counts_by_rank(audience_counts // show_counts)
                            movie_code = self.naver_movie.get_movie_code_by_title(movie.name)
                            age_rate = self.naver_movie.get_age_rate_by_code(movie_code)
                            for idx, rate in enumerate(age_rate):
                                min_age = date(schedule.datetime.year - (idx + 1) * 10, 1, 1)
                                max_age = date(schedule.datetime.year - (idx + 2) * 10, 1, 1)
                                profile = choice(list(Profile.objects.filter(user__birth_date__range=[max_age, min_age])))
                                for _ in range(int(randint(60, 100) * rate)):
                                    try:
                                        Reservation.create(
                                            profile=profile,
                                            schedule=schedule.id,
                                            item=Item.get_proper_ticket(age=profile.user.age, day=schedule.datetime.weekday(), hour=hour),
                                            coupon=None,
                                            non_coupon=None,
                                            column=randint(0, theater.seat.columns),
                                            row=randint(0, theater.seat.rows)
                                        )
                                    except SeatExistException:
                                        continue

                            print(f'-- <Reservation> {schedule} {counts}개 생성 완료 --')

                        except MovieExistException:
                            except_count += 1

                print(f'-- <Schedule> {base_date} 일: [{movie}] {show_counts - except_count}개 데이터 생성 완료 --')

            self.kobis.start_date += timedelta(days=1)


