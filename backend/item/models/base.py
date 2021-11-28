from django.db import models
from psqlextra.types import PostgresPartitioningMethod
from psqlextra.models import PostgresPartitionedModel


class MainCategory(models.Model):
    name = models.CharField(max_length=20, verbose_name='대분류')


class MiddleCategory(models.Model):
    main_category = models.ForeignKey(MainCategory, on_delete=models.CASCADE, verbose_name='대분류')
    name = models.CharField(max_length=20, verbose_name='중분류')


class SubCategory(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=['main_category'], name='main_category_idx')
        ]

    main_category = models.ForeignKey(MainCategory, on_delete=models.CASCADE, verbose_name='대분류')
    middle_category = models.ForeignKey(MiddleCategory, on_delete=models.CASCADE, verbose_name='중분류')
    name = models.CharField(max_length=20, verbose_name='소분류')


class Item(models.Model):
    category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, verbose_name='소분류')
    name = models.CharField(max_length=30, verbose_name='상품명')
    image = models.ImageField(upload_to='item/%Y/%m', verbose_name='상품 사진')
    price = models.IntegerField(verbose_name='판매 가격')
    is_sell = models.BooleanField(default=True, verbose_name='판매 여부')


class Order(PostgresPartitionedModel):
    class PartitioningMeta:
        method = PostgresPartitioningMethod.RANGE
        key = ['datetime']

        class Meta:
            indexes = [
                models.Index(fields=['profile'], name='order_profile_idx')
            ]

    profile = models.ForeignKey('accounts.Profile', on_delete=models.CASCADE, verbose_name='프로필')
    item = models.ForeignKey('item.Item', on_delete=models.CASCADE, verbose_name='상품')
    coupon_hold = models.ForeignKey('accounts.CouponHold', on_delete=models.CASCADE, verbose_name='쿠폰 내역')
    non_coupon_hold = models.ForeignKey('accounts.NonCouponHold', on_delete=models.CASCADE, verbose_name='비쿠폰 내역')
    datetime = models.DateTimeField(auto_now_add=True, unique=True)
    price = models.IntegerField(verbose_name='지불액')
    is_canceled = models.BooleanField(default=False, verbose_name='취소여부')
