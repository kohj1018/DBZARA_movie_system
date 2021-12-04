from rest_framework import serializers

from item.models import SubCategory, Item, Event


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'main_category', 'middle_category', 'name']


class ItemSerializer(serializers.ModelSerializer):
    category = SubCategorySerializer()

    class Meta:
        model = Item
        fields = ['id', 'category', 'name', 'image', 'price']


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ['id', 'title', 'remain_date', 'backdrop_url']


class EventDetailSerializer(EventSerializer):

    class Meta(EventSerializer.Meta):
        fields = ['id', 'title', 'start_date', 'end_date', 'poster_url']
