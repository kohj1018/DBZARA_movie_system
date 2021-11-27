from rest_framework import serializers

from .models import Movie, Genre, Actor, Director, Distributor, Image


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ['name', 'image']


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = ['name', 'image']


class DistributorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distributor
        fields = ['name', 'image']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['category', 'image']


class PosterSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ['name', 'images']


class ActorDetailSerializer(serializers.ModelSerializer):
    filmography = PosterSerializer(many=True)

    class Meta:
        model = Actor
        fields = ['name', 'image', 'filmography']


class MovieSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    actors = ActorDetailSerializer(many=True)

    class Meta:
        model = Movie
        # TODO: 평점, 랭크 및 예매율 표시
        fields = ['id', 'name', 'images', 'actors']


class MovieDetailSerializer(MovieSerializer):
    genres = GenreSerializer(many=True)
    actors = ActorSerializer(many=True)
    directors = DirectorSerializer(many=True)
    distributors = DistributorSerializer(many=True)

    class Meta:
        fields = ['id', 'kobis_id', 'tmdb_id', 'imdb_id', 'name', 'running_time', 'summary', 'opening_date',
                  'closing_date', 'genres', 'actors', 'directors', 'distributors', 'images', 'rank']


