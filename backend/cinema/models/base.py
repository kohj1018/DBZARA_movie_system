from django.db import models
from datetime import datetime, timedelta

from psqlextra.types import PostgresPartitioningMethod
from psqlextra.models import PostgresPartitionedModel

from exception.movie_exception import MovieExistException


class Cinema(models.Model):
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
    events = models.ManyToManyField('item.Event', related_name='cinema')

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
        if Schedule.objects.filter(theater=self, datetime__range=(schedule_time, schedule_time + timedelta(minutes=movie.running_time + 30))).count() == 0:
            return Schedule.objects.create(
                cinema=self.cinema,
                theater=self,
                movie=movie,
                datetime=schedule_time
            )
        else:
            raise MovieExistException

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


class Reservation(PostgresPartitionedModel):
    class PartitioningMeta:
        method = PostgresPartitioningMethod.RANGE
        key = ["datetime"]

    schedule = models.BigIntegerField()
    order = models.BigIntegerField()
    datetime = models.DateTimeField(auto_now_add=True)
    reservation_number = models.CharField(max_length=15)
    seat_column = models.IntegerField()
    seat_row = models.IntegerField()
    is_canceled = models.BooleanField(default=False)

