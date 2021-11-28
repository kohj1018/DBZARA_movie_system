from .list import (
    CinemaListView
)

from .api import (
    CinemaAPIListView, CinemaAPIDetailView, ScheduleAPIView, ScheduleCinemaAPIView, ScheduleMovieAPIView
)

cinemas = CinemaListView.as_view()
