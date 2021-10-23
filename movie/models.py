from django.db import models


class Person(models.Model):
    class Meta:
        abstract = True
    name = models.CharField(max_length=20)
    birth_date = models.DateField


class Movie(models.Model):
    # TODO: Remove CODE
    rating = models.IntegerField()
    running_time = models.IntegerField()
    summary = models.TextField()
    opening_date = models.DateField()
    closing_date = models.DateField()
    genres = models.ManyToManyField('movie.Genre')
    actors = models.ManyToManyField('movie.Actor')
    directors = models.ManyToManyField('movie.Director')
    distributors = models.ManyToManyField('movie.Distributor')
    images = models.ManyToManyField('movie.Image', related_name='+')


class Genre(models.Model):
    name = models.CharField(max_length=10, unique=True)


class Actor(Person):
    image = models.ImageField(upload_to='actors')


class Director(Person):
    image = models.ImageField(upload_to='directors')


class Distributor(models.Model):
    name = models.CharField(max_length=20)
    image = models.ImageField(upload_to='distributors')


class Image(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=['movie'], name='movie_images_idx')
        ]
    CATEGORY_CHOICES = [
        (1, '스틸컷'),
        (2, '이후는 찾아서 적어보자')
    ]
    category = models.IntegerField(choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='movie/images')
