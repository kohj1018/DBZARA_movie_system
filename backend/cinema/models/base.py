from django.db import models
from datetime import datetime, timedelta
from random import randint

from psqlextra.types import PostgresPartitioningMethod
from psqlextra.models import PostgresPartitionedModel

from item.models import Order
from exception.movie_exception import MovieExistException
from exception.cinema_exception import SeatExistException


class Cinema(models.Model):
    class Meta:
        ordering = ['id']

    RANK_CHOICES = [
        (1, 'S 등급'),
        (2, 'A 등급'),
        (3, 'B 등급'),
        (4, 'C 등급'),
        (5, 'D 등급'),
        (6, 'F 등급')
    ]
    name = models.CharField(max_length=20, unique=True, verbose_name='이름')
    main_region = models.CharField(max_length=10, verbose_name='시도명')
    sub_region = models.CharField(max_length=10, verbose_name='시군구명')
    address = models.CharField(max_length=80, verbose_name='주소')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, verbose_name='위도')
    longitude = models.DecimalField(max_digits=9, decimal_places=6, verbose_name='경도')
    grade = models.IntegerField(choices=RANK_CHOICES)
    schedules = models.ManyToManyField('movie.Movie', through='cinema.Schedule', through_fields=('cinema', 'movie'), related_name='+')
    inquiries = models.ManyToManyField('accounts.Profile', through='cinema.Question', through_fields=('cinema', 'profile'), related_name='+')
    stocks = models.ManyToManyField('item.Item', through='cinema.Stock', through_fields=('cinema', 'item'), related_name='+')
    events = models.ManyToManyField('item.Event', blank=True, related_name='cinema')

    @property
    def two_dimension_count(self):
        return self.theater_set.filter(category='2D').count()

    @property
    def three_dimension_count(self):
        return self.theater_set.filter(category='3D').count()

    # TODO: Fix Function Name
    def on_time(self):
        return self.schedule_set.filter(datetime__gt=datetime.now())

    def __str__(self):
        return self.name


class Theater(models.Model):
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE, verbose_name='영화관')
    seat = models.ForeignKey('Seat', on_delete=models.CASCADE, verbose_name='좌석구조')
    name = models.CharField(max_length=5, verbose_name='이름')
    category = models.CharField(max_length=10, verbose_name='종류')
    floor = models.IntegerField(verbose_name='층')
    materials = models.ManyToManyField('item.Item', through='cinema.Material', through_fields=('theater', 'item'), related_name='+')

    def add_schedule(self, movie, schedule_time):
        if movie.running_time is None:
            movie.running_time = 0
        if Schedule.objects.filter(theater=self, datetime__range=(schedule_time, schedule_time + timedelta(minutes=movie.running_time + 30))).count() == 0:
            return Schedule.objects.create(
                cinema=self.cinema,
                theater=self,
                movie=movie,
                datetime=schedule_time
            )
        else:
            raise MovieExistException

    def counts_by_rank(self, count):
        rate = (1 - (self.cinema.grade * 0.05))
        return randint(int(count * (rate - 0.1)), int(count * rate))

    def __str__(self):
        return f'{self.cinema}: {self.name}'


class Seat(models.Model):
    columns = models.IntegerField(verbose_name='열')
    rows = models.IntegerField(verbose_name='행')

    def __str__(self):
        return f'{self.columns} : {self.rows}'


class Schedule(PostgresPartitionedModel):
    class PartitioningMeta:
        method = PostgresPartitioningMethod.RANGE
        key = ["datetime"]

        class Meta:
            indexes = [
                models.Index(fields=['cinema'], name='schedule_cinema_idx')
            ]

    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE)
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE)
    movie = models.ForeignKey('movie.Movie', on_delete=models.CASCADE)
    datetime = models.DateTimeField()

    def __str__(self):
        return f'{self.theater} - {self.movie}'


class Reservation(PostgresPartitionedModel):
    class PartitioningMeta:
        method = PostgresPartitioningMethod.RANGE
        key = ["datetime"]

    schedule = models.BigIntegerField()
    order = models.BigIntegerField()
    datetime = models.DateTimeField(auto_now_add=True)
    seat_column = models.IntegerField()
    seat_row = models.IntegerField()
    is_canceled = models.BooleanField(default=False)

    @property
    def movie(self):
        return Schedule.objects.get(id=self.schedule).movie

    @property
    def movie_datetime(self):
        return Schedule.objects.get(id=self.schedule).datetime

    @property
    def reservation_number(self):
        return ''.join([chr(65+int(element)) for element in str(self.datetime.day).zfill(2)] + [chr(65+int(element)) for element in str(self.datetime.hour).zfill(2)] +
                       [chr(65+int(element)) for element in str(self.datetime.minute).zfill(2)] + [chr(65+int(element)) for element in str(self.id).zfill(5)] +
                       [chr(65+int(element)) for element in str(self.seat_column).zfill(2)] + [chr(65+int(element)) for element in str(self.seat_row).zfill(2)])

    @classmethod
    def create(cls, profile, schedule, item, coupon, non_coupon, column, row):
        if cls.objects.filter(schedule=schedule, seat_column=column, seat_row=row).count() != 0:
            raise SeatExistException

        return cls.objects.create(
            schedule=schedule,
            order=Order.create(profile, item, coupon, non_coupon).id,
            seat_column=column,
            seat_row=row
        )
    