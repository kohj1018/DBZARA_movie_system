from datetime import date

from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from item.serializers import (
    ItemSerializer, EventSerializer, SubCategorySerializer, EventDetailSerializer
)
from item.models import Event


class EventListAPIView(ListAPIView):
    queryset = Event.objects.filter(end_date__gte=date.today())
    permission_classes = [AllowAny]
    serializer_class = EventSerializer


class EventDetailAPIView(RetrieveAPIView):
    queryset = Event.objects.all()
    permission_classes = [AllowAny]
    serializer_class = EventDetailSerializer
