from django.db import models
from . import Cinema


class QuestionCategory(models.Model):
    content = models.CharField(max_length=100, verbose_name='내용')
    question_category = models.ForeignKey('self', on_delete=models.CASCADE)


class Question(models.Model):
    category = models.ForeignKey(QuestionCategory, on_delete=models.CASCADE)
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE)
    profile = models.ForeignKey('accounts.Profile', on_delete=models.CASCADE)
    title = models.CharField(max_length=100, verbose_name='제목')
    created = models.DateTimeField(auto_now_add=True)
    content = models.TextField(verbose_name='내용')
    attachment = models.ImageField(upload_to='inquiry/%Y/%m')


class Answer(models.Model):
    question = models.OneToOneField(Question, on_delete=models.CASCADE)
    employee = models.ForeignKey('accounts.Employee', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    attachment = models.ImageField(upload_to='inquiry/%Y/%m')

