from cinema.serializers.base import *


class ReservationSerializer(ScheduleSerializer):
    name = serializers.ReadOnlyField(source='theater.name')
    floor = serializers.ReadOnlyField(source='theater.floor')
    seat = SeatSerializer(source='theater.seat')

    class Meta(ScheduleSerializer.Meta):
        fields = ['id', 'name', 'floor', 'seat', 'start_datetime', 'end_datetime']
