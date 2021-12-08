from datetime import datetime

from django.urls import path, register_converter

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from item import views as item
from accounts import views as accounts
from cinema import views as cinema
from movie import views as movie

app_name = 'api'


class DateConverter:
    regex = '\d{4}-\d{2}-\d{2}'

    def to_python(self, value):
        return datetime.strptime(value, '%Y-%m-%d')

    def to_url(self, value):
        return value


register_converter(DateConverter, 'yyyy')

urlpatterns = [
    # authentication api
    path('token/', obtain_jwt_token),
    path('token/verify/', verify_jwt_token),
    path('token/refresh/', refresh_jwt_token),

    # event api
    path('event/', item.event_list_api_view, name='event'),
    path('event/<int:pk>/', item.event_detail_api_view, name='event-detail'),

    # item api
    path('store/', item.store_list_api_view, name='item'),

    # accounts api
    path('accounts/profile/', accounts.profile_api_view, name='profile'),
    path('accounts/login/google/', accounts.google_login_api_view, name='google-login'),
    path('accounts/login/kakao/', accounts.kakao_login_api_viwe, name='kakao-login'),
    path('accounts/movies/', accounts.profile_movie_api_view, name='profile-movie'),
    path('accounts/genres/', accounts.profile_genre_api_view, name='profile-genre'),
    path('accounts/actors/', accounts.profile_actor_api_view, name='profile-actor'),
    path('accounts/directors/', accounts.profile_director_api_view, name='profile-director'),
    path('accounts/distributors/', accounts.profile_distributor_api_view, name='profile-distributor'),
    path('accounts/movies/<int:pk>/', accounts.profile_movie_detail_api_view, name='profile-detail-movie'),
    path('accounts/genres/<int:pk>/', accounts.profile_genre_detail_api_view, name='profile-detail-genre'),
    path('accounts/actors/<int:pk>/', accounts.profile_actor_detail_api_view, name='profile-detail-actor'),
    path('accounts/directors/<int:pk>/', accounts.profile_director_detail_api_view, name='profile-detail-director'),
    path('accounts/distributors/<int:pk>/', accounts.profile_distributor_detail_api_view,
         name='profile-detail-distributor'),

    # cinema api
    path('cinema/', cinema.cinema_api_list_view, name='cinema'),
    path('cinema/<int:pk>/', cinema.cinema_api_detail_view, name='cinema-detail'),

    # schedule api
    path('schedule/', cinema.schedule_api_view, name='schedule'),
    path('schedule/cinema/<int:pk>/', cinema.schedule_cinema_api_view, name='schedule-detail-cinema'),
    path('schedule/movie/<int:pk>/', cinema.schedule_movie_api_view, name='schedule-detail-movie'),
    path('schedule/date/<yyyy:search_date>/', cinema.schedule_date_api_view, name='schedule-detail-date'),

    # review api
    path('review/', movie.review_api_view, name='review'),
    path('review/<int:pk>/', movie.review_detail_api_view, name='review-detail'),

    # movie api
    path('movie/', movie.movie_list_api_view, name='movie-list'),
    path('movie/<int:pk>/', movie.movie_detail_api_view, name='movie-detail'),
    path('movie/<int:pk>/info/', movie.movie_info_api_view, name='movie-info'),
    path('movie/<int:pk>/people/', movie.movie_staff_api_view, name='movie-staff'),
    path('movie/<int:pk>/images/', movie.movie_image_api_view, name='movie-images'),
    path('movie/<int:pk>/videos/', movie.movie_video_api_view, name='movie-videos'),
    path('movie/<int:pk>/reviews/', movie.movie_review_api_view, name='movie-reviews'),

    # person api
    path('actor/<int:pk>/', movie.actor_detail_api_view, name='actor-list'),
    path('director/<int:pk>/', movie.director_detail_api_view, name='director-list'),
]
