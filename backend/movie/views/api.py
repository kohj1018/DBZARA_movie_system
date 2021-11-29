from datetime import date

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status

from movie.models import Movie
from movie.serializers import BoxOfficeMovieSerializer, NotOpenMovieSerializer, MovieDetailSerializer


class BoxOfficeMovieAPIListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        opening_date = date(2018, 1, 1)
        closing_date = date(2018, 1, 2)
        query_set = sorted(Movie.objects.filter(
            closing_date__range=(opening_date, closing_date)
        ), key=lambda movie: movie.reservation_rate, reverse=True)
        serializer = BoxOfficeMovieSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NotOpenMovieAPIListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query_set = Movie.objects.filter(
            opening_date__gt=date(2018, 2, 1)
        ).order_by('opening_date')[:10]
        serializer = NotOpenMovieSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MovieAPIDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        query_set = Movie.objects.get(pk=pk)
        serializer = MovieDetailSerializer(query_set)
        return Response(serializer.data, status.HTTP_200_OK)
