from django.db import models
from django.utils.html import mark_safe


class Person(models.Model):
    class Meta:
        abstract = True
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    birth_date = models.DateField(null=True)


class Movie(models.Model):
    kobis_id = models.CharField(max_length=8)
    tmdb_id = models.CharField(max_length=10)
    imdb_id = models.CharField(max_length=10, null=True)
    name = models.CharField(max_length=50)
    running_time = models.IntegerField(null=True)
    summary = models.TextField()
    opening_date = models.DateField()
    closing_date = models.DateField()
    genres = models.ManyToManyField('movie.Genre')
    actors = models.ManyToManyField('movie.Actor', through='movie.Character',  through_fields=('movie', 'actor'))
    directors = models.ManyToManyField('movie.Director')
    distributors = models.ManyToManyField('movie.Distributor')
    images = models.ManyToManyField('movie.Image', related_name='+')

    def __str__(self):
        return self.name

    @property
    def poster(self):
        return self.images.get(category=2).image.url


class Genre(models.Model):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name


class Actor(Person):
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
    image = models.ImageField(upload_to='movie/directors', null=True)

    def image_tag(self):
        if self.image:
            return mark_safe(f'<img src="{self.image.url}" width="150" height="150" />')
        return None

    image_tag.short_description = 'Image'

    def __str__(self):
        return self.name


class Distributor(models.Model):
    distributor_id = models.CharField(max_length=10)
    name = models.CharField(max_length=60)
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
