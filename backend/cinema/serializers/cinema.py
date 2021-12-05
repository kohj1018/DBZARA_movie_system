from cinema.serializers.base import *
from movie.serializers import MovieSerializer, MovieShortSerializer


class CinemaDetailSerializer(CinemaSerializer):
    theaters = TheaterSerializer(source='theater_set', many=True)

    class Meta(CinemaSerializer.Meta):
        fields = CinemaSerializer.Meta.fields + ['address', 'latitude', 'longitude', 'grade', 'two_dimension_count', 'three_dimension_count', 'theaters']


class ScheduleDetailSerializer(ScheduleSerializer):

    class Meta(ScheduleSerializer.Meta):
        pass


class ScheduleCinemaSerializer(CinemaSerializer):
    schedules = MovieShortSerializer(source='schedule_by_cinema', many=True)

    class Meta(CinemaSerializer.Meta):
        fields = ['name', 'schedules']


class ScheduleMovieSerializer(MovieSerializer):
    schedule = ScheduleSerializer(source='schedule_by_movie', many=True)

    class Meta(MovieSerializer.Meta):
        fields = ['name', 'schedule']
