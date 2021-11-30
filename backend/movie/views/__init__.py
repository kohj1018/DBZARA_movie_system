from .api import (
    BoxOfficeMovieAPIListView, NotOpenMovieAPIListView, MovieAPIDetailView,
    MovieStaffAPIView, MovieImageAPIView, MovieVideoAPIView, MovieReviewAPIView,
    ReviewAPIView, ReviewDetailAPIView
)

from .list import (
    MovieListView, ActorListView, DirectorListView, DistributorListView, GenreListView
)

from .detail import (
    ActorDetailView, DirectorDetailView, MovieDetailView
)

box_office_movie_api_view = BoxOfficeMovieAPIListView.as_view()
not_open_movie_api_view = NotOpenMovieAPIListView.as_view()
movie_detail_api_view = MovieAPIDetailView.as_view()
movie_staff_api_view = MovieStaffAPIView.as_view()
movie_image_api_view = MovieImageAPIView.as_view()
movie_video_api_view = MovieVideoAPIView.as_view()
movie_review_api_view = MovieReviewAPIView.as_view()
review_api_view = ReviewAPIView.as_view()
review_detail_api_view = ReviewDetailAPIView.as_view()
