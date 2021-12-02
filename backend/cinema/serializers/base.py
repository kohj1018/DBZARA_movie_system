from rest_framework import serializers

from cinema.models import Cinema, Theater, Seat, Schedule


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['columns', 'rows']


class TheaterSerializer(serializers.ModelSerializer):
    seat = SeatSerializer()

    class Meta:
        model = Theater
        fields = ['id', 'name', 'seat', 'category', 'floor']


class CinemaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cinema
        fields = ['id', 'main_region', 'sub_region', 'name']


class ScheduleSerializer(serializers.ModelSerializer):
    movie = serializers.ReadOnlyField(source='movie.name')
    cinema = CinemaSerializer()

    class Meta:
        model = Schedule
        fields = ['id', 'datetime', 'movie', 'cinema']
