from django.contrib import admin

from .models import Item, MainCategory, MiddleCategory, SubCategory, Order, Event, Benefit, Coupon, NonCoupon

# Register your models here.


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'category', 'name', 'image']


@admin.register(MainCategory)
class MainCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(MiddleCategory)
class MiddleCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'datetime', 'profile', 'item', 'coupon_hold', 'non_coupon_hold', 'price']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass


@admin.register(Benefit)
class BenefitAdmin(admin.ModelAdmin):
    pass


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    pass


@admin.register(NonCoupon)
class NonCouponAdmin(admin.ModelAdmin):
    pass
