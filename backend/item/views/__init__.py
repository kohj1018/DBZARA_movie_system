from .api import (
    EventListAPIView, EventDetailAPIView
)

from .list import (
    EventListView
)

event_list_api_view = EventListAPIView.as_view()
event_detail_api_view = EventDetailAPIView.as_view()
