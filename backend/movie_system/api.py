from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from cinema import views as cinema
from movie import views as movie

app_name = 'api'

urlpatterns = [
    # authentication api
    path('token/', obtain_jwt_token),
    path('token/verify/', verify_jwt_token),
    path('token/refresh/', refresh_jwt_token),

    # cinema api
    path('cinema/', cinema.cinema_api_list_view, name='cinema'),
    path('cinema/<int:pk>/', cinema.cinema_api_detail_view, name='cinema-detail'),
    path('schedule/', cinema.schedule_api_view, name='schedule'),
    path('schedule/cinema/<int:pk>/', cinema.schedule_cinema_api_view, name='schedule-detail-cinema'),
    path('schedule/movie/<int:pk>/', cinema.schedule_movie_api_view, name='schedule-detail-movie'),

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
]
