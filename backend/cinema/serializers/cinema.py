from cinema.serializers.base import *
from movie.serializers import MovieSerializer


class CinemaDetailSerializer(CinemaSerializer):
    theaters = TheaterSerializer(source='theater_set', many=True)

    class Meta(CinemaSerializer.Meta):
        fields = CinemaSerializer.Meta.fields + ['address', 'latitude', 'longitude', 'grade', 'two_dimension_count', 'three_dimension_count', 'theaters']


class ScheduleDetailSerializer(ScheduleSerializer):
    theater = TheaterSerializer()

    class Meta(ScheduleSerializer.Meta):
        model = Schedule
        fields = ScheduleSerializer.Meta.fields + ['theater']


class ScheduleCinemaSerializer(CinemaSerializer):
    schedule = ScheduleDetailSerializer(source='schedule_by_cinema', many=True)

    class Meta(CinemaSerializer.Meta):
        fields = ['name', 'schedule']


class ScheduleMovieSerializer(MovieSerializer):
    schedule = ScheduleSerializer(source='schedule_by_movie', many=True)

    class Meta(MovieSerializer.Meta):
        fields = ['name', 'schedule']
