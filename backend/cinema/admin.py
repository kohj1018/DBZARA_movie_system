from django.contrib import admin
from .models import Cinema, Theater, Seat, Schedule


# Register your models here.
@admin.register(Cinema)
class CinemaAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'main_region', 'sub_region', 'address', 'grade']


@admin.register(Theater)
class TheaterAdmin(admin.ModelAdmin):
    list_display = ['id', 'cinema', 'seat', 'category', 'name', 'floor']
    search_fields = ['cinema']


@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ['id', 'columns', 'rows']


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ['id', 'cinema', 'theater', 'movie', 'datetime']
