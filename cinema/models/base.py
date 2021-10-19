from django.db import models
from datetime import datetime


class Cinema(models.Model):
    RANK_CHOICES = [
        (1, 'S 등급'),
        (2, 'A 등급'),
        (3, 'B 등급'),
        (4, 'C 등급'),
    ]
    name = models.CharField(max_length=20, unique=True, verbose_name='이름')
    address = models.CharField(max_length=50, verbose_name='주소')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, verbose_name='위도')
    longitude = models.DecimalField(max_digits=9, decimal_places=6, verbose_name='경도')
    grade = models.IntegerField(choices=RANK_CHOICES)
    schedules = models.ManyToManyField('movie.Movie', through='cinema.Schedule', through_fields=('cinema', 'movie'))
    inquiries = models.ManyToManyField('accounts.Profile', through='cinema.Question', through_fields=('cinema', 'profile'))
    stocks = models.ManyToManyField('item.Item', through='cinema.Stock', through_fields=('cinema', 'item'))
    events = models.ManyToManyField('item.Event')

    # TODO: Fix Function Name
    def on_time(self):
        return self.schedule_set.filter(datetime__gt=datetime.now())


class Theater(models.Model):
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE, verbose_name='영화관')
    seat = models.ForeignKey('Seat', on_delete=models.CASCADE, verbose_name='좌석구조')
    name = models.CharField(max_length=5, verbose_name='이름')
    category = models.CharField(max_length=10, verbose_name='종류')
    floor = models.IntegerField(verbose_name='층')
    materials = models.ManyToManyField('item.Item', through='cinema.Material', through_fields=('theater', 'item'))


class Seat(models.Model):
    columns = models.IntegerField(verbose_name='열')
    rows = models.IntegerField(verbose_name='행')


class Schedule(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=['cinema'], name='schedule_cinema_idx')
        ]
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE)
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE)
    movie = models.ForeignKey('movie.Movie', on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    reservations = models.ManyToManyField('item.Order', through='Reservation', through_fields=('schedule', 'order'))


# TODO: ADD attribute profile id? - with Index
# TODO: PostgreSQL Partitioning
class Reservation(models.Model):
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    # profile = models.ForeignKey('accounts.Profile', on_delete=models.CASCADE)
    order = models.ForeignKey('item.Order', on_delete=models.CASCADE)
    reservation_number = models.CharField(max_length=20)
    seat_column = models.IntegerField()
    seat_row = models.IntegerField()


