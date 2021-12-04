from django.db import models
from psqlextra.types import PostgresPartitioningMethod
from psqlextra.models import PostgresPartitionedModel


class MainCategory(models.Model):
    name = models.CharField(max_length=20, verbose_name='대분류')

    def __str__(self):
        return self.name


class MiddleCategory(models.Model):
    main_category = models.ForeignKey(MainCategory, on_delete=models.CASCADE, verbose_name='대분류')
    name = models.CharField(max_length=20, verbose_name='중분류')

    def __str__(self):
        return f'{self.main_category.name} - {self.name}'


class SubCategory(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=['main_category'], name='main_category_idx')
        ]

    main_category = models.ForeignKey(MainCategory, on_delete=models.CASCADE, verbose_name='대분류')
    middle_category = models.ForeignKey(MiddleCategory, on_delete=models.CASCADE, verbose_name='중분류')
    name = models.CharField(max_length=20, verbose_name='소분류')

    def __str__(self):
        return f'{self.main_category.name} - {self.middle_category.name} - {self.name}'


class Item(models.Model):
    category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, verbose_name='소분류')
    name = models.CharField(max_length=30, verbose_name='상품명')
    image = models.ImageField(upload_to='item/%Y/%m', verbose_name='상품 사진', blank=True)
    price = models.IntegerField(verbose_name='판매 가격')
    is_sell = models.BooleanField(default=True, verbose_name='판매 여부')

    def __str__(self):
        return str(self.id)

    @classmethod
    def get_proper_ticket(cls, age, day, hour, name='2D'):
        query_set = cls.objects.filter(category__main_category__name='티켓')

        if age <= 19:
            query_set = query_set.filter(category__middle_category__name='청소년')
        elif age >= 60:
            query_set = query_set.filter(category__middle_category__name='우대')
        else:
            query_set = query_set.filter(category__middle_category__name='성인')

        if day in [5, 6]:
            sub_category_name = '주말_'
        else:
            sub_category_name = '주중_'

        if 0 <= hour <= 3:
            sub_category_name += '심야'
        elif 8 <= hour <= 9:
            sub_category_name += '조조'
        elif 12 <= hour <= 13:
            sub_category_name += '브런치'
        else:
            sub_category_name += '일반'

        return query_set.get(category__name=sub_category_name, name=name)


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
    coupon_hold = models.ForeignKey('accounts.CouponHold', on_delete=models.CASCADE, null=True, verbose_name='쿠폰 내역')
    non_coupon_hold = models.ForeignKey('accounts.NonCouponHold', on_delete=models.CASCADE, null=True, verbose_name='비쿠폰 내역')
    datetime = models.DateTimeField(auto_now_add=True, unique=True)
    price = models.IntegerField(verbose_name='지불액')
    is_canceled = models.BooleanField(default=False, verbose_name='취소여부')

    def __str__(self):
        return f'{self.profile} - {self.item.name}'

    @classmethod
    def create(cls, profile, item, coupon, non_coupon):
        price = item.price
        # FIXME: 비회원 적립 대한 예외 처리
        point = 0

        # TODO: 동시 할인 적용 확인 필요
        if coupon and non_coupon:
            raise Exception

        if non_coupon:
            price = non_coupon.benefit.discount_price(price)
            point += non_coupon.benefit.point

        if coupon:
            price = coupon.benefit.discount_price(price)
            point += coupon.benefit.point

        order = cls.objects.create(
            profile=profile,
            item=item,
            coupon_hold=coupon,
            non_coupon_hold=non_coupon,
            price=price
        )

        profile.mileage_set.create(point=point, content=f'{item.name}(으)로 적립', order=order.id)
        return order
