from django.db import models
from . import Cinema, Theater


class Stock(models.Model):
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE)
    item = models.ForeignKey('item.Item', on_delete=models.CASCADE)
    supplier = models.ForeignKey('Supplier', on_delete=models.CASCADE)
    standard_quantity = models.IntegerField()
    quantity = models.IntegerField()
    supply_price = models.IntegerField()
    modified = models.DateTimeField(auto_now=True)


# TODO: ADD Supply Item Category?
class Supplier(models.Model):
    name = models.CharField(max_length=100)
    manager_name = models.CharField(max_length=50)
    # FIXME: ADD Validator for Phone number
    manager_phone_number = models.CharField(max_length=13)


class Material(models.Model):
    STATUS_CHOICES = [
        (4, '신품'),
        (3, '중고품'),
        (2, '정비필요품'),
        (1, '폐품')
    ]
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE)
    item = models.ForeignKey('item.Item', on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS_CHOICES)
