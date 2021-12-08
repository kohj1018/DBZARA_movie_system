from rest_framework import serializers

from movie.models import (
    Movie, Genre, Actor, Character, Director, Distributor, Image, Video, Review, MovieInfo, MovieRank
)


class MovieSerializer(serializers.ModelSerializer):
    poster = serializers.ImageField(use_url=True)
    backdrop = serializers.ImageField(use_url=True)

    class Meta:
        model = Movie
        fields = ['id', 'grade', 'name', 'poster', 'backdrop']


class MovieShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'name', 'grade']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']


class ActorSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Actor
        fields = ['id', 'name', 'image']


class DirectorSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Director
        fields = ['id', 'name', 'image']


class DistributorSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Distributor
        fields = ['id', 'name', 'image']


class ImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Image
        fields = ['category', 'image']


class CharacterSerializer(serializers.ModelSerializer):
    actor = ActorSerializer()

    class Meta:
        model = Character
        fields = ['movie', 'actor', 'character_name']


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['category', 'video']


class ReviewSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='profile.anonymization_name')
    sympathy = serializers.ReadOnlyField()
    not_sympathy = serializers.ReadOnlyField()

    class Meta:
        model = Review
        fields = ['id', 'movie', 'name', 'score', 'comment', 'sympathy', 'not_sympathy', 'created']


class MovieInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieInfo
        fields = ['movie', 'age', 'gender', 'counts', 'sales', 'age_percent', 'gender_percent', 'updated']


class MovieRankSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='movie.id')
    poster = serializers.ImageField(source='movie.poster', use_url=True)
    backdrop = serializers.ImageField(source='movie.backdrop', use_url=True)

    class Meta(MovieSerializer.Meta):
        model = MovieRank
        fields = ['id', 'name', 'grade', 'poster', 'backdrop']


class ReservationRankSerializer(MovieRankSerializer):
    class Meta(MovieRankSerializer.Meta):
        fields = MovieRankSerializer.Meta.fields + ['reservation_rate', 'review_rate']


class ReviewRankSerializer(MovieRankSerializer):
    class Meta(MovieRankSerializer.Meta):
        fields = MovieRankSerializer.Meta.fields + ['review_rate', 'review_rate']


class NotOpenSerializer(MovieRankSerializer):
    class Meta(MovieRankSerializer.Meta):
        fields = MovieRankSerializer.Meta.fields + ['opening_count']
