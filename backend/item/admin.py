from django.contrib import admin

from .models import Item, MainCategory, MiddleCategory, SubCategory, Order

# Register your models here.


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    pass


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
