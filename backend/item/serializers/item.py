from rest_framework import serializers

from item.serializers.base import *


class StoreSerializer(serializers.ModelSerializer):
    snack = serializers.SerializerMethodField()
    beverage = serializers.SerializerMethodField()
    combo = serializers.SerializerMethodField()

    def get_snack(self, instance):
        return ItemSerializer(self.instance.filter(category_id__in=list(range(33, 36))), many=True).data

    def get_beverage(self, instance):
        return ItemSerializer(self.instance.filter(category_id__in=list(range(36, 43))), many=True).data

    def get_combo(self, instance):
        return ItemSerializer(self.instance.filter(category_id=43), many=True).data

    class Meta:
        model = Item
        fields = ['snack', 'beverage', 'combo']
