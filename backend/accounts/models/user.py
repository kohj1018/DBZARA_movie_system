from datetime import datetime, timedelta

from django.contrib.auth.models import AbstractUser
from django.db import models
from psqlextra.models import PostgresPartitionedModel
from psqlextra.types import PostgresPartitioningMethod

from . import Attendance


# TODO: Discuss Employee extends AbstractUser
class User(AbstractUser):
    GENDER_CHOICES = [
        ('M', '남성'),
        ('F', '여성'),
    ]
    PLATFORM_CHOICES = [
        (1, 'Django'),
        (2, 'Naver'),
        (3, 'Google'),
        (4, 'Kakao')
    ]
    platform = models.SmallIntegerField(choices=PLATFORM_CHOICES, default=1)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=1, null=True)
    birth_date = models.DateField(null=True)
    is_manager = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)

    @property
    def age(self):
        try:
            return datetime.now().year - self.birth_date.year + 1
        except AttributeError:
            return 20

    @property
    def is_social(self):
        return self.platform != 1

    @property
    def full_name(self):
        return self.last_name + self.first_name

    def __str__(self) -> str:
        return self.full_name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    grade = models.ForeignKey('accounts.Grade', on_delete=models.CASCADE, default=1)
    image = models.ImageField(upload_to='profile/%Y/%m/', null=True, blank=True)
    # orders = models.ManyToManyField('item.Item', through='item.Order', through_fields=('profile', 'item'))
    coupons = models.ManyToManyField('item.Coupon', through='accounts.CouponHold', through_fields=('profile', 'coupon'))
    non_coupons = models.ManyToManyField('item.NonCoupon', through='accounts.NonCouponHold', through_fields=('profile', 'non_coupon'))
    favorite_movies = models.ManyToManyField('movie.Movie', blank=True)
    favorite_genres = models.ManyToManyField('movie.Genre', blank=True)
    favorite_actors = models.ManyToManyField('movie.Actor', blank=True)
    favorite_directors = models.ManyToManyField('movie.Director', blank=True)
    favorite_distributors = models.ManyToManyField('movie.Distributor', blank=True)

    def add_coupons(self, coupon):
        self.coupons.add(coupon)

    def add_non_coupons(self, non_coupon):
        self.non_coupons.add(non_coupon)

    def add_favorite_genre(self, genre):
        self.favorite_genres.add(genre)

    def delete_favorite_genre(self, genre):
        self.favorite_genres.remove(genre)

    def add_favorite_actor(self, actor):
        self.favorite_actors.add(actor)

    def delete_favorite_actor(self, actor):
        self.favorite_actors.remove(actor)

    def add_favorite_director(self, director):
        self.favorite_directors.add(director)

    def delete_favorite_director(self, director):
        self.favorite_directors.remove(director)

    def add_favorite_movie(self, movie):
        self.favorite_movies.add(movie)

    def delete_favorite_movie(self, movie):
        self.favorite_movies.remove(movie)

    def add_favorite_distributor(self, distributor):
        self.favorite_distributors.add(distributor)

    def get_to_work(self):
        # FIXME: 오늘 날짜를 받을 수 있게 수정
        if Attendance.objects.get(employee_id=self, date=datetime.date()):
            raise Exception('이미 출근처리 되어 있습니다.')
        return Attendance.objects.create(
            employee=self,
            start_time=datetime.now(),
            status=0
        )

    def get_off_work(self, status):
        attendance = Attendance.objects.get(employee_id=self, date=datetime.date())
        if not attendance:
            raise models.ObjectDoesNotExist('출근전에 퇴근처리할 할 수 없습니다.')
        attendance.end_time = datetime.now()
        attendance.status = status
        attendance.save()
        return attendance

    def absent_work(self):
        return Attendance.objects.create(
            employee=self,
            status=3
        )

    @property
    def anonymization_name(self):
        return self.user.username[:3] + ("*" * len(self.user.username[3:]))

    @property
    def mileage_sum(self):
        return Mileage.objects.filter(profile=self)

    def __str__(self):
        return self.user.full_name


class CouponHold(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=['profile'], name='coupon_hold_profile_idx')
        ]
    profile = models.ForeignKey('accounts.Profile', on_delete=models.CASCADE)
    coupon = models.ForeignKey('item.Coupon', on_delete=models.CASCADE)
    issue_date = models.DateField(auto_now_add=True)
    used_date = models.DateField(null=True, default=None)

    def use_coupon(self):
        self.used_date = datetime.now()

    @property
    def expiration_date(self):
        return self.issue_date + timedelta(days=self.coupon.duration)

    @property
    def is_used(self):
        return self.used_date is not None


class NonCouponHold(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=['profile'], name='non_coupon_hold_profile_idx')
        ]
    profile = models.ForeignKey('accounts.Profile', on_delete=models.CASCADE)
    non_coupon = models.ForeignKey('item.NonCoupon', on_delete=models.CASCADE)
    used_date = models.DateField(auto_now_add=True)

    def use_non_coupon(self):
        self.used_date = datetime.now()


class Grade(models.Model):
    name = models.CharField(max_length=10)
    benefits = models.JSONField()


class Mileage(PostgresPartitionedModel):
    class PartitioningMeta:
        method = PostgresPartitioningMethod.RANGE
        key = ['created']

        class Meta:
            indexes = [
                models.Index(fields=['profile'], name='mileage_profile_idx')
            ]

    profile = models.ForeignKey('accounts.Profile', on_delete=models.CASCADE)
    order = models.BigIntegerField()
    created = models.DateTimeField(auto_now_add=True)
    point = models.IntegerField()
    content = models.CharField(max_length=30)
