from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status

from cinema.serializers import CinemaSerializer, CinemaDetailSerializer, ScheduleSerializer, ScheduleCinemaSerializer, ScheduleMovieSerializer
from cinema.models import Cinema, Theater, Seat
from movie.models import Movie


class CinemaAPIListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query_set = Cinema.objects.all()
        serializer = CinemaSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CinemaAPIDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        query_set = Cinema.objects.get(pk=pk)
        serializer = CinemaDetailSerializer(query_set)
        return Response(serializer.data, status=status.HTTP_200_OK)


# FIXME: TO GET MOVIES & CINEMAS DATA
# class ScheduleAPIView(APIView):
#     permission_classes = [AllowAny]
#
#     def get(self, request):
#         query_set = Cinema.objects.all()
#         serializer = ScheduleSerializer(query_set, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)


class ScheduleCinemaAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        query_set = Cinema.objects.get(pk=pk)
        serializer = ScheduleCinemaSerializer(query_set)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ScheduleMovieAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        query_set = Movie.objects.get(pk=pk)
        serializer = ScheduleMovieSerializer(query_set)
        return Response(serializer.data, status=status.HTTP_200_OK)

