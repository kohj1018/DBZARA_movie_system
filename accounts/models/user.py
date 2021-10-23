from django.contrib.auth.models import AbstractUser
from django.db import models

from psqlextra.types import PostgresPartitioningMethod
from psqlextra.models import PostgresPartitionedModel
from datetime import datetime, timedelta
from . import Attendance


# TODO: Discuss Employee extends AbstractUser
class User(AbstractUser):
    GENDER_CHOICES = [
        ('M', '남성'),
        ('F', '여성'),
    ]
    gender = models.CharField(choices=GENDER_CHOICES, max_length=1)
    birth_date = models.DateField()
    is_manager = models.BooleanField(default=False)

    @property
    def age(self):
        return datetime.now().year - self.birth_date.year + 1


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    grade = models.ForeignKey('accounts.Grade', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile/%Y/%m/')
    coupons = models.ManyToManyField('item.Coupon', through='accounts.CouponHold', through_fields=('profile', 'coupon'))
    non_coupons = models.ManyToManyField('item.NonCoupon', through='accounts.NonCouponHold', through_fields=('profile', 'non_coupon'))
    orders = models.ManyToManyField('item.Item', through='item.Order', through_fields=('profile', 'item'))
    # TODO: Rename ForeignKey Model(Genre, Actor, Director, Movie, Distributor)
    favorite_movies = models.ManyToManyField('movie.Movie')
    favorite_genres = models.ManyToManyField('movie.Genre')
    favorite_actors = models.ManyToManyField('movie.Actor')
    favorite_directors = models.ManyToManyField('movie.Director')
    favorite_distributors = models.ManyToManyField('movie.Distributor')

    def add_coupons(self, coupon):
        # FIXME: 둘 중 어떤걸 사용해야될지 모르겠음.
        # CouponHold.objects.create(
        #     profile=self,
        #     coupon=coupon
        # )
        self.coupons.create(coupon)

    def add_non_coupons(self, non_coupon):
        # FIXME: 둘 중 어떤걸 사용해야될지 모르겠음.
        # NonCouponHold.objects.create(
        #     profile=self,
        #     non_coupon=non_coupon,
        # )
        self.non_coupons.create(non_coupon)

    def add_favorite_genre(self, genre):
        self.favorite_genres.add(genre)

    def delete_favorite_genre(self, genre):
        self.favorite_genres.remove(genre)

    def add_favorite_actor(self, actor):
        self.favorite_actors.add(actor)

    def delete_favorite_actor(self, actor):
        self.favorite_actors.remove(actor)

    def add_favorite_director(self, director):
        self.favorite_actors.add(director)

    def delete_favorite_director(self, director):
        self.favorite_actors.remove(director)

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


class CouponHold(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=['profile'], name='coupon_hold_profile_idx')
        ]
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
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
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    non_coupon = models.ForeignKey('item.NonCoupon', on_delete=models.CASCADE)
    used_date = models.DateField(auto_now_add=True)

    def use_non_coupon(self):
        self.used_date = datetime.now()

    @property
    def is_used(self):
        return self.used_date is not None


class Grade(models.Model):
    name = models.CharField(max_length=10)
    benefits = models.JSONField()


# TODO: PostgreSQL Partitioning
class Mileage(PostgresPartitionedModel):
    class PartitioningMeta:
        class Meta:
            indexes = [
                models.Index(fields=['profile'], name='mileage_profile_idx')
            ]
        method = PostgresPartitioningMethod.RANGE
        key = ['created']

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    point = models.IntegerField()
    content = models.CharField(max_length=10)
