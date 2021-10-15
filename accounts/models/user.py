from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    grade = models.ForeignKey('Grade', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile/%Y/%m/')


class Grade(models.Model):
    name = models.CharField(max_length=10)
    benefits = models.JSONField()


class Mileage(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    point = models.IntegerField()
    content = models.CharField(max_length=10)
    