from .api import (
    EventListAPIView, EventDetailAPIView, StoreListAPIView
)

event_list_api_view = EventListAPIView.as_view()
event_detail_api_view = EventDetailAPIView.as_view()
store_list_api_view = StoreListAPIView.as_view()
