from .list import EmployeeListView, EmployeeAttendanceListView, EmployerEvaluationListView

from .social import GoogleLoginView, KakaoLoginAPIView

from .api import (
    ProfileMovieAPIView, ProfileGenreAPIView, ProfileActorAPIView, ProfileDirectorAPIView, ProfileDistributorAPIView,
    ProfileMovieDetailAPIView, ProfileGenreDetailAPIView, ProfileActorDetailAPIView, ProfileDirectorDetailAPIView,
    ProfileDistributorDetailAPIView, ProfileAPIView
)


employee_list_view = EmployeeListView.as_view()
employee_attendance_list_view = EmployeeAttendanceListView.as_view()
employee_evaluate_list_view = EmployerEvaluationListView.as_view()


profile_api_view = ProfileAPIView.as_view()
profile_movie_api_view = ProfileMovieAPIView.as_view()
profile_genre_api_view = ProfileGenreAPIView.as_view()
profile_actor_api_view = ProfileActorAPIView.as_view()
profile_director_api_view = ProfileDirectorAPIView.as_view()
profile_distributor_api_view = ProfileDistributorAPIView.as_view()
profile_movie_detail_api_view = ProfileMovieDetailAPIView.as_view()
profile_genre_detail_api_view = ProfileGenreDetailAPIView.as_view()
profile_actor_detail_api_view = ProfileActorDetailAPIView.as_view()
profile_director_detail_api_view = ProfileDirectorDetailAPIView.as_view()
profile_distributor_detail_api_view = ProfileDistributorDetailAPIView.as_view()
google_login_api_view = GoogleLoginView.as_view()
kakao_login_api_viwe = KakaoLoginAPIView.as_view()
