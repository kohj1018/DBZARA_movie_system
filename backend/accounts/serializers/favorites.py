from accounts.serializers.base import *
from movie.serializers import (
    MovieSerializer, GenreSerializer, ActorSerializer, DirectorSerializer, DistributorSerializer
)


class ProfileMovieSerializer(ProfileSerializer):
    movies = MovieSerializer(source='favorite_movies', many=True)

    class Meta(ProfileSerializer.Meta):
        fields = ['movies']


class ProfileGenreSerializer(ProfileSerializer):
    genres = GenreSerializer(source='favorite_genres', many=True)

    class Meta(ProfileSerializer.Meta):
        fields = ['genres']


class ProfileActorSerializer(ProfileSerializer):
    actors = ActorSerializer(source='favorite_actors', many=True)

    class Meta(ProfileSerializer.Meta):
        fields = ['actors']


class ProfileDirectorSerializer(ProfileSerializer):
    directors = DirectorSerializer(source='favorite_directors', many=True)

    class Meta(ProfileSerializer.Meta):
        fields = ['directors']


class ProfileDistributorsSerializer(ProfileSerializer):
    distributors = DistributorSerializer(source='favorite_distributors', many=True)

    class Meta(ProfileSerializer.Meta):
        fields = ['distributors']
