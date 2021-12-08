from datetime import date

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, GenericAPIView
from rest_framework.permissions import AllowAny

from item.serializers import (
    ItemSerializer, EventSerializer, EventDetailSerializer
)
from item.models import Event, Item


class EventListAPIView(ListAPIView):
    queryset = Event.objects.filter(end_date__gte=date.today())
    permission_classes = [AllowAny]
    serializer_class = EventSerializer


class EventDetailAPIView(RetrieveAPIView):
    queryset = Event.objects.all()
    permission_classes = [AllowAny]
    serializer_class = EventDetailSerializer


class StoreListAPIView(APIView):
    queryset = Item.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ItemSerializer

    def get(self, request):
        return Response(self.get_store(), status=status.HTTP_200_OK)

    def get_store(self):
        ticket = self.queryset.filter(category__middle_category_id=1)
        ticket_serializer = self.serializer_class(ticket, many=True)

        snack = self.queryset.filter(category_id__in=list(range(33, 36)))
        snack_serializer = self.serializer_class(snack, many=True)

        beverage = self.queryset.filter(category_id__in=list(range(36, 42)))
        beverage_serializer = self.serializer_class(beverage, many=True)
        
        combo = self.queryset.filter(category_id=42)
        combo_serializer = self.serializer_class(combo, many=True)
        return {
            'ticket': ticket_serializer.data,
            'snack': snack_serializer.data,
            'beverage': beverage_serializer.data,
            'combo': combo_serializer.data
        }
