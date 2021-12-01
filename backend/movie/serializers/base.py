from rest_framework import serializers

from movie.models import (
    Movie, Genre, Actor, Character, Director, Distributor, Image, Video, Review
)


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['name', 'poster', 'backdrop']


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

    class Meta:
        model = Review
        fields = ['name', 'comment', 'sympathy', 'not_sympathy', 'created']
