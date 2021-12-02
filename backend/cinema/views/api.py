from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework import status

from cinema.serializers import CinemaSerializer, CinemaDetailSerializer, ScheduleSerializer, ScheduleCinemaSerializer, ScheduleMovieSerializer
from cinema.models import Cinema, Theater, Seat
from movie.models import Movie


class CinemaListAPIView(ListAPIView):
    queryset = Cinema.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CinemaSerializer


class CinemaDetailAPIView(RetrieveAPIView):
    queryset = Cinema.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CinemaDetailSerializer()


# FIXME: TO GET MOVIES & CINEMAS DATA
# class ScheduleAPIView(APIView):
#     permission_classes = [AllowAny]
#
#     def get(self, request):
#         query_set = Cinema.objects.all()
#         serializer = ScheduleSerializer(query_set, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)


class ScheduleCinemaAPIView(RetrieveAPIView):
    queryset = Cinema.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ScheduleCinemaSerializer


class ScheduleMovieAPIView(RetrieveAPIView):
    queryset = Movie.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ScheduleMovieSerializer
