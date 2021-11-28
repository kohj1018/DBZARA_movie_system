from rest_framework.serializers import ModelSerializer

from .models import Cinema, Theater, Seat


class CinemaSerializer(ModelSerializer):
    class Meta:
        model = Cinema
        fields = ['name', 'main_region', 'sub_region', 'grade', 'schedules', ]
