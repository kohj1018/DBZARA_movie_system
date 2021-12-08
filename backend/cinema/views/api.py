from datetime import date, datetime, timedelta

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework import status

from cinema.serializers import CinemaSerializer, CinemaDetailSerializer, ReservationSerializer
from cinema.models import Cinema, Theater, Seat, Schedule
from movie.models import Movie
from movie.serializers import ReservationChoiceMovieSerializer, MovieSerializer, MovieShortSerializer


class CinemaListAPIView(ListAPIView):
    queryset = Cinema.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CinemaSerializer


class CinemaDetailAPIView(RetrieveAPIView):
    queryset = Cinema.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CinemaDetailSerializer


class ScheduleCinemaAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        base_date = date.today()
        today = datetime(base_date.year, base_date.month, base_date.day)
        cinema = Cinema.objects.get(pk=pk)
        queryset = Movie.objects.filter(pk__in=cinema.schedule_movie_by_cinema)
        serializer = MovieShortSerializer(queryset, many=True)
        return Response({
            'cinemas': CinemaSerializer(cinema).data,
            'movies': serializer.data,
            'date': set([datetime.strftime(d, '%Y-%m-%d') for d in cinema.schedule_datetime_by_cinema if d >= today])
        }, status=status.HTTP_200_OK)


class ScheduleDateAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, search_date):
        start_datetime = search_date
        end_datetime = search_date + timedelta(days=1) - timedelta(seconds=1)
        queryset = Schedule.objects.filter(datetime__range=[start_datetime, end_datetime])
        movie_serializer = MovieShortSerializer(
            Movie.objects.filter(pk__in=queryset.values_list('movie', flat=True).distinct()), many=True)
        cinema_serializer = CinemaSerializer(
            Cinema.objects.filter(pk__in=queryset.values_list('cinema', flat=True).distinct()), many=True)
        return Response({
            'date': search_date,
            'movies': movie_serializer.data,
            'cinemas': cinema_serializer.data
        }, status=status.HTTP_200_OK)


class ScheduleMovieAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        base_date = date.today()
        today = datetime(base_date.year, base_date.month, base_date.day)
        movie = Movie.objects.get(pk=pk)
        queryset = Cinema.objects.filter(pk__in=movie.schedule_cinema_by_movie)
        serializer = CinemaSerializer(queryset, many=True)
        return Response({
            'movies': MovieSerializer(movie).data,
            'cinemas': serializer.data,
            'date': set([datetime.strftime(d, '%Y-%m-%d') for d in movie.schedule_datetime_by_movie if d > today])
        }, status=status.HTTP_200_OK)


class ScheduleAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        option = self.request.query_params.get('option', 'top')
        today = date.today()
        movie_query_set = sorted(Movie.objects.filter(
            closing_date__gte=today
        ), key=lambda movie: movie.reservation_rate, reverse=True)

        if option == 'top':
            cinema_query_set = Cinema.objects.all()
            cinema_serializer = CinemaSerializer(cinema_query_set, many=True)
            movie_serializer = ReservationChoiceMovieSerializer(movie_query_set[:10], many=True)
            rest_serializer = ReservationChoiceMovieSerializer(movie_query_set[10:], many=True)

            return Response({
                'cinemas': cinema_serializer.data,
                'movies': movie_serializer.data,
                'rests': rest_serializer.data

            }, status=status.HTTP_200_OK)

        elif option == 'sub':
            movie_query_set = movie_query_set[10:]
            movie_serializer = ReservationChoiceMovieSerializer(movie_query_set[:10], many=True)
            rest_serializer = ReservationChoiceMovieSerializer(movie_query_set[10:], many=True)
            return Response(movie_serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        schedule = request.data
        search_date = date(*[int(element) for element in schedule['date'].split('-')])
        queryset = Schedule.objects.filter(movie__id=schedule['movie'], cinema__id=schedule['cinema'], datetime__year=search_date.year, datetime__month=search_date.month, datetime__day=search_date.day)
        serializer = ReservationSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
