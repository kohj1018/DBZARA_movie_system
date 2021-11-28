from .list import (
    CinemaListView
)

from .api import (
    CinemaAPIListView, CinemaAPIDetailView, ScheduleCinemaAPIView, ScheduleMovieAPIView
)

cinemas = CinemaListView.as_view()
