from django.shortcuts import render
from django.views.generic import ListView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Movie, Actor, Director
from .serializers import MovieSerializer
# Create your views here.


class MovieListView(ListView):
    model = Movie
    context_object_name = 'movies'
    template_name = 'movie/movie_list.html'
    paginate_by = 12


class ActorListView(ListView):
    model = Actor
    context_object_name = 'persons'
    template_name = 'movie/person_list.html'
    paginate_by = 12


class DirectorListView(ListView):
    model = Director
    context_object_name = 'persons'
    template_name = 'movie/person_list.html'
    paginate_by = 12


class MovieAPIView(APIView):
    def get(self, request):
        query_set = Movie.objects.all()
        serializer = MovieSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
