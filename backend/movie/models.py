from datetime import date, timedelta

from django.db import models, connection
from django.utils.html import mark_safe

from accounts.models import User
from item.models import Order
from cinema.models import Reservation, Schedule
from exception.movie_exception import ReviewException
from .validators import validate_score


class Person(models.Model):
    class Meta:
        abstract = True
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=250)
    birth_date = models.DateField(null=True)

    @property
    def filmography(self):
        return self.movie_set.all()


class Movie(models.Model):
    kobis_id = models.CharField(max_length=8)
    tmdb_id = models.CharField(max_length=10, null=True)
    imdb_id = models.CharField(max_length=10, null=True)
    name = models.CharField(max_length=100)
    watch_grade = models.CharField(max_length=50)
    running_time = models.IntegerField(null=True)
    summary = models.TextField()
    opening_date = models.DateField()
    closing_date = models.DateField()
    genres = models.ManyToManyField('movie.Genre')
    actors = models.ManyToManyField('movie.Actor', through='movie.Character',  through_fields=('movie', 'actor'))
    directors = models.ManyToManyField('movie.Director')
    distributors = models.ManyToManyField('movie.Distributor')
    images = models.ManyToManyField('movie.Image', related_name='+')
    videos = models.ManyToManyField('movie.Video', related_name='+')

    def __str__(self):
        return self.name

    @property
    def grade(self):
        if self.watch_grade == '전체관람가':
            return 0
        elif self.watch_grade == '12세이상관람가':
            return 12
        elif self.watch_grade == '15세이상관람가':
            return 15
        else:
            return 19

    @property
    def poster(self):
        return self.images.get(category=1).image

    @property
    def backdrop(self):
        return self.images.get(category=2).image

    @property
    def schedule_cinema_by_movie(self):
        base_date = date.today()
        return self.schedule_set.filter(movie__closing_date__gt=base_date).values_list('cinema', flat=True).distinct()

    @property
    def schedule_datetime_by_movie(self):
        base_date = date.today()
        return self.schedule_set.filter(movie__closing_date__gt=base_date).values_list(
            'datetime', flat=True).distinct()

    @property
    def reservation_rate(self):
        now_date = date.today()
        prev_date = date.today() - timedelta(days=14)
        return round(Reservation.objects.filter(
            schedule__in=Schedule.objects.filter(movie=self, datetime__range=[prev_date, now_date])
        ).count() / Reservation.objects.filter(
            schedule__in=Schedule.objects.filter(datetime__range=[prev_date, now_date])
        ).count(), 3) * 100

    @property
    def reservation(self):
        return self.movierank_set.first().reservation_rate

    @property
    def review(self):
        return self.movierank_set.first().reservation_rate

    @property
    def short_directors(self):
        return self.directors.all()[:8]

    @property
    def short_actors(self):
        return self.character_set.all()[:8]

    def __str__(self):
        return self.name


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
    character_name = models.CharField(max_length=250)

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
    name = models.CharField(max_length=250)
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
        (2, 'BackDrop'),
        (3, 'Others'),
    ]
    category = models.IntegerField(choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='movie/images', null=True)

    def image_tag(self):
        if self.image:
            return mark_safe(f'<img src="{self.image.url}" width="150" height="150" />')
        else:
            return None

    image_tag.short_description = 'Image'


class Video(models.Model):
    category = models.CharField(max_length=30)
    site = models.CharField(max_length=20)
    key = models.CharField(max_length=20)

    @property
    def video(self):
        if self.site == 'YouTube':
            return f'https://www.youtube.com/embed/{self.key}'


class Review(models.Model):
    class Meta:
        unique_together = ['movie', 'profile']

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    profile = models.ForeignKey('accounts.Profile', on_delete=models.DO_NOTHING)
    score = models.IntegerField(validators=[validate_score])
    comment = models.TextField()
    sympathy = models.IntegerField(default=0)
    not_sympathy = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)

    @classmethod
    def create(cls, movie, profile, score, comment, sympathy, not_sympathy):
        if cls.objects.filter(movie=movie, profile=profile).count() != 0:
            raise ReviewException

        return cls.objects.create(
            movie=movie,
            profile=profile,
            score=score,
            comment=comment,
            sympathy=sympathy,
            not_sympathy=not_sympathy
        )


class MovieInfo(models.Model):
    movie = models.OneToOneField('movie.Movie', on_delete=models.CASCADE)
    age = models.JSONField(null=True)
    gender = models.JSONField(null=True)
    counts = models.IntegerField(default=0)
    sales = models.IntegerField(default=0)
    updated = models.DateField(auto_now=True)

    @property
    def age_percent(self):
        temp = dict()
        if self.counts == 0:
            return temp
        for element in self.age.keys():
            temp[element] = round(self.age.get(element) / self.counts, 2)
        return temp

    @property
    def gender_percent(self):
        temp = dict()
        if self.counts == 0:
            return temp
        for element in self.gender.keys():
            temp[element] = round(self.gender.get(element) / self.counts, 2)
        return temp

    @classmethod
    def create(cls, movie):
        return cls.objects.get_or_create(movie=movie)[0]

    def update(self):
        counts = 0
        age = {
            '10': 0,
            '20': 0,
            '30': 0,
            '40': 0,
            '50': 0
        }
        gender = {
            'M': 0,
            'F': 0
        }
        sales = 0
        schedules = Schedule.objects.filter(movie=self.movie)
        for schedule in schedules:
            reservations = Reservation.objects.filter(schedule=schedule.id)
            for reservation in reservations:
                order = Order.objects.get(pk=reservation.order)
                counts += 1
                sales += order.price
                gender[order.profile.user.gender] += 1
                if 10 <= order.profile.user.age < 60:
                    age[str(order.profile.user.age // 10 * 10)] += 1

        self.age = age
        self.gender = gender
        self.counts = counts
        self.sales = sales
        self.save()


class MovieRank(models.Model):
    movie = models.ForeignKey('Movie', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    grade = models.IntegerField()
    reservation_rate = models.FloatField()
    review_rate = models.FloatField()
    review_rate_rank = models.IntegerField()
    reservation_rate_rank = models.IntegerField()

    @property
    def opening_count(self):
        now_date = date.today()
        return (self.movie.opening_date - now_date) / timedelta(days=1)

    @classmethod
    def update(cls):
        now_date = date.today()
        cursor = connection.cursor()
        cursor.execute("TRUNCATE TABLE movie_movierank")
        cursor.execute("ALTER SEQUENCE movie_movierank_id_seq RESTART WITH 1;")
        movies = Movie.objects.filter(
            opening_date__lte=now_date,
            closing_date__gt=now_date
        )
        for movie in movies:
            reservation_rate = movie.reservation_rate
            reviews = movie.review_set.all().values_list('score', flat=True)
            review_rate = round(sum(reviews) / reviews.count(), 3) if reviews.count() != 0 else 0
            cls.objects.create(
                movie=movie,
                name=movie.name,
                grade=movie.grade,
                reservation_rate=round(reservation_rate, 1),
                review_rate=round(review_rate, 1),
                reservation_rate_rank=0,
                review_rate_rank=0
            )

        ranks = cls.objects.all()

        reservation_ranks = ranks.order_by('-reservation_rate')
        for idx, movie in enumerate(reservation_ranks):
            movie.reservation_rate_rank = idx + 1
            movie.save()

        review_ranks = ranks.order_by('-review_rate')
        for idx, movie in enumerate(review_ranks):
            movie.review_rate_rank = idx + 1
            movie.save()

        not_open_movies = Movie.objects.filter(opening_date__gte=now_date)
        for movie in not_open_movies:
            cls.objects.create(
                movie=movie,
                name=movie.name,
                grade=movie.grade,
                reservation_rate=0,
                review_rate=0,
                reservation_rate_rank=0,
                review_rate_rank=0
            )
