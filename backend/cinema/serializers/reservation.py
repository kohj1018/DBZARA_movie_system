from cinema.serializers.base import *


class ReservationSerializer(ScheduleSerializer):
    name = serializers.ReadOnlyField(source='theater.name')
    floor = serializers.ReadOnlyField(source='theater.floor')

    class Meta(ScheduleSerializer.Meta):
        fields = ['id', 'name', 'floor', 'start_datetime', 'end_datetime']
