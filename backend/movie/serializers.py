from rest_framework.serializers import ModelSerializer

from .models import Movie, Genre, Actor, Director, Distributor, Image


class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']


class ActorSerializer(ModelSerializer):
    class Meta:
        model = Actor
        fields = ['name', 'image']


class DirectorSerializer(ModelSerializer):
    class Meta:
        model = Director
        fields = ['name', 'image']


class DistributorSerializer(ModelSerializer):
    class Meta:
        model = Distributor
        fields = ['name', 'image']


class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = ['category', 'image']


class MovieSerializer(ModelSerializer):
    genres = GenreSerializer(many=True)
    actors = ActorSerializer(many=True)
    directors = DirectorSerializer(many=True)
    distributors = DistributorSerializer(many=True)
    images = ImageSerializer(many=True)

    class Meta:
        model = Movie
        fields = ['id', 'kobis_id', 'tmdb_id', 'imdb_id', 'name', 'running_time', 'summary', 'opening_date', 'closing_date', 'genres', 'actors', 'directors', 'distributors', 'images']
