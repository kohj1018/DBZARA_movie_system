from django.db import models


class Benefit(models.Model):
    BENEFIT_CHOICES = [
        (1, '가격 할인'),
        (2, '퍼센트 할인'),
        (3, '포인트 적립'),
        (4, '증정품 제공'),
    ]
    item = models.ForeignKey('item.Item', on_delete=models.CASCADE)
    type = models.IntegerField(choices=BENEFIT_CHOICES)
    content = models.IntegerField()


class Event(models.Model):
    title = models.CharField(max_length=50)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    image = models.ImageField(upload_to='item/%Y/%m', null=True)
    coupon = models.ManyToManyField(Benefit, through='Coupon', through_fields=('event', 'benefit'), related_name='+')
    non_coupon = models.ManyToManyField(Benefit, through='NonCoupon', through_fields=('event', 'benefit'), related_name='+')


class Coupon(models.Model):
    benefit = models.ForeignKey(Benefit, on_delete=models.CASCADE, related_name='+')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='+')
    amount = models.IntegerField(verbose_name='최대 수량')
    duration = models.IntegerField(verbose_name='유효 기간')


class NonCoupon(models.Model):
    benefit = models.ForeignKey(Benefit, on_delete=models.CASCADE, related_name='+')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='+')
    amount = models.IntegerField(verbose_name='최대 수량')
