from .list import (
    CinemaListView, CinemaScheduleListView
)

from .api import (
    CinemaAPIListView, CinemaAPIDetailView, ScheduleCinemaAPIView, ScheduleMovieAPIView
)

cinemas = CinemaListView.as_view()
cinema_schedule_list_view = CinemaScheduleListView.as_view()

cinema_api_list_view = CinemaAPIListView.as_view()
cinema_api_detail_view = CinemaAPIDetailView.as_view()
schedule_cinema_api_view = ScheduleCinemaAPIView.as_view()
schedule_movie_api_view = ScheduleMovieAPIView.as_view()
