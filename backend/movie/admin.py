from django.contrib import admin
from .models import Movie, Actor, Director, Distributor, Character, Image
# Register your models here.


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ['id', 'kobis_id', 'tmdb_id', 'imdb_id', 'name', 'running_time', 'opening_date', 'closing_date']
    search_fields = ['name']


@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    list_display = ['id', 'image_tag', 'name', 'code']
    readonly_fields = ['image_tag']
    search_fields = ['name', 'code']


@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
    list_display = ['id', 'movie', 'actor', 'character_name']
    search_fields = ['actor']

@admin.register(Director)
class DirectorAdmin(admin.ModelAdmin):
    list_display = ['id', 'image_tag', 'name', 'code']
    readonly_fields = ['image_tag']
    search_fields = ['name', 'code']


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'image_tag', 'category']
    readonly_fields = ['image_tag']
