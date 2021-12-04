from django.urls import path

from .views import EventListView

urlpatterns = [
    path('event/', EventListView.as_view(), name='event')
]