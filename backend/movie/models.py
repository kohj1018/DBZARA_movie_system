from datetime import date, timedelta

from django.db import models
from django.utils.html import mark_safe

from accounts.models import User
from cinema.models import Reservation, Schedule
from .validators import validate_score


class Person(models.Model):
    class Meta:
        abstract = True
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    birth_date = models.DateField(null=True)

    @property
    def filmography(self):
        return self.movie_set.all()


class Movie(models.Model):
    kobis_id = models.CharField(max_length=8)
    tmdb_id = models.CharField(max_length=10)
    imdb_id = models.CharField(max_length=10, null=True)
    name = models.CharField(max_length=80)
    running_time = models.IntegerField(null=True)
    summary = models.TextField()
    opening_date = models.DateField()
    closing_date = models.DateField()
    genres = models.ManyToManyField('movie.Genre')
    actors = models.ManyToManyField('movie.Actor', through='movie.Character',  through_fields=('movie', 'actor'))
    directors = models.ManyToManyField('movie.Director')
    distributors = models.ManyToManyField('movie.Distributor')
    images = models.ManyToManyField('movie.Image', related_name='+')
    review = models.ManyToManyField('accounts.Profile', through='movie.Review', through_fields=('movie', 'profile'))

    def __str__(self):
        return self.name

    @property
    def image(self):
        return self.images.get(category=1).image

    @property
    def poster(self):
        return self.images.get(category=1).image.url

    @property
    def backdrop(self):
        return self.images.get(category=2).image.url

    @property
    def schedule_by_movie(self):
        base_date = date(2018, 1, 1)
        return self.schedule_set.filter(datetime__range=[base_date, base_date + timedelta(days=3)])

    @property
    def reservation_rate(self):
        # FIXME: Just for Test
        now_date = date(2018, 1, 1)
        return round(Reservation.objects.filter(
            schedule__in=Schedule.objects.filter(movie=self, datetime__month=now_date.month, datetime__day=now_date.day)
        ).count() / Reservation.objects.filter(
            schedule__in=Schedule.objects.filter(datetime__month=now_date.month, datetime__day=now_date.day)
        ).count(), 3) * 100


class Genre(models.Model):
    class Meta:
        ordering = ['id']

    name = models.CharField(max_length=30, unique=True)

    @property
    def count(self):
        return self.movie_set.count()

    def __str__(self):
        return self.name


class Actor(Person):
    class Meta:
        ordering = ['id']

    image = models.ImageField(upload_to='movie/actors', null=True)

    def image_tag(self):
        if self.image:
            return mark_safe(f'<img src="{self.image.url}" width="150" height="150" />')
        else:
            return None

    image_tag.short_description = 'Image'

    def __str__(self):
        return self.name


class Character(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    actor = models.ForeignKey(Actor, on_delete=models.CASCADE)
    character_name = models.CharField(max_length=100)

    def __str__(self):
        return self.character_name


class Director(Person):
    class Meta:
        ordering = ['id']

    image = models.ImageField(upload_to='movie/directors', null=True)

    def image_tag(self):
        if self.image:
            return mark_safe(f'<img src="{self.image.url}" width="150" height="150" />')
        return None

    image_tag.short_description = 'Image'

    def __str__(self):
        return self.name


class Distributor(models.Model):
    class Meta:
        ordering = ['id']

    distributor_id = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='movie/distributors', null=True)

    def image_tag(self):
        if self.image:
            return mark_safe(f'<img src="{self.image.url}" width="150" height="150" />')
        return None

    image_tag.short_description = 'Image'

    def __str__(self):
        return self.name


class Image(models.Model):
    CATEGORY_CHOICES = [
        (1, 'Poster'),
        (2, 'BackDrop')
    ]
    category = models.IntegerField(choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='movie/images', null=True)

    def image_tag(self):
        if self.image:
            return mark_safe(f'<img src="{self.image.url}" width="150" height="150" />')
        else:
            return None

    image_tag.short_description = 'Image'


class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey('accounts.Profile', on_delete=models.DO_NOTHING)
    score = models.IntegerField(validators=[validate_score])
    comment = models.TextField()
    sympathy = models.IntegerField()
    not_sympathy = models.IntegerField()
