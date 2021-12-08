from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated

from movie.models import Movie, Genre, Actor, Director, Distributor
from movie.serializers import (
    MovieSerializer, GenreSerializer, ActorSerializer, DirectorSerializer, DistributorSerializer
)
from accounts.models import Profile
from accounts.serializers import (
    ProfileSerializer, ProfileMovieSerializer, ProfileGenreSerializer, ProfileActorSerializer, ProfileDirectorSerializer, ProfileDistributorsSerializer
)


class ProfileBaseAPIView(RetrieveModelMixin, GenericAPIView):
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.queryset.get(user=self.request.user)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class ProfileAPIView(ProfileBaseAPIView):
    serializer_class = ProfileSerializer


class ProfileMovieAPIView(ProfileBaseAPIView):
    serializer_class = ProfileMovieSerializer


class ProfileGenreAPIView(ProfileBaseAPIView):
    serializer_class = ProfileGenreSerializer


class ProfileActorAPIView(ProfileBaseAPIView):
    serializer_class = ProfileActorSerializer


class ProfileDirectorAPIView(ProfileBaseAPIView):
    serializer_class = ProfileDirectorSerializer


class ProfileDistributorAPIView(ProfileBaseAPIView):
    serializer_class = ProfileDistributorsSerializer


class ProfileMovieDetailAPIView(GenericAPIView):
    queryset = Movie.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = MovieSerializer

    def post(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        movie = self.get_object()
        profile.add_favorite_movie(movie)
        serializer = MovieSerializer(movie)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        profile.delete_favorite_movie(self.get_object())
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileGenreDetailAPIView(GenericAPIView):
    queryset = Genre.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = GenreSerializer

    def post(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        genre = self.get_object()
        profile.add_favorite_genre(genre)
        serializer = GenreSerializer(genre)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        profile.delete_favorite_genre(self.get_object())
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileActorDetailAPIView(GenericAPIView):
    queryset = Actor.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ActorSerializer

    def post(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        actor = self.get_object()
        profile.add_favorite_actor(actor)
        serializer = ActorSerializer(actor)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        profile.delete_favorite_actor(self.get_object())
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileDirectorDetailAPIView(GenericAPIView):
    queryset = Director.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = DirectorSerializer

    def post(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        director = self.get_object()
        profile.add_favorite_director(director)
        serializer = DirectorSerializer(director)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        profile.delete_favorite_director(self.get_object())
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileDistributorDetailAPIView(GenericAPIView):
    queryset = Distributor.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = DistributorSerializer

    def post(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        distributor = self.get_object()
        profile.add_favorite_distributor(distributor)
        serializer = DistributorSerializer(distributor)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        profile.delete_favorite_distributor(self.get_object())
        return Response(status=status.HTTP_204_NO_CONTENT)
