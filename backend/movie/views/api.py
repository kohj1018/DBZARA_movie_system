from datetime import date

from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from accounts.models import Profile
from movie.models import Movie, Review
from movie.serializers import (
    BoxOfficeMovieSerializer, NotOpenMovieSerializer, MovieDetailSerializer, MovieStaffSerializer,
    MovieImageSerializer, MovieVideoSerializer, MovieReviewSerializer, ReviewSerializer
)


class BoxOfficeMovieAPIListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        opening_date = date(2018, 1, 1)
        closing_date = date(2018, 1, 2)
        query_set = sorted(Movie.objects.filter(
            closing_date__range=(opening_date, closing_date)
        ), key=lambda movie: movie.reservation_rate, reverse=True)
        serializer = BoxOfficeMovieSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NotOpenMovieAPIListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query_set = Movie.objects.filter(
            opening_date__gt=date(2018, 2, 1)
        ).order_by('opening_date')[:10]
        serializer = NotOpenMovieSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MovieBaseAPIView (APIView):
    permission_classes = [AllowAny]
    model = Movie
    serializer = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    @swagger_auto_schema(responses={
        200: 'Return Object',
        404: 'Object Does not exist'
    })
    def get(self, request, pk):
        query_set = self.get_object(pk)
        serializer = self.serializer(query_set)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MovieAPIDetailView(MovieBaseAPIView):
    serializer = MovieDetailSerializer


class MovieStaffAPIView(MovieBaseAPIView):
    serializer = MovieStaffSerializer


class MovieImageAPIView(MovieBaseAPIView):
    """
    Movie Image View
    ___
    영화와 관련된 이미지 반환
    """
    serializer = MovieImageSerializer


class MovieVideoAPIView(MovieBaseAPIView):
    serializer = MovieVideoSerializer


class MovieReviewAPIView(MovieBaseAPIView):
    serializer = MovieReviewSerializer


class ReviewBaseAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer = ReviewSerializer
    model = Review


class ReviewAPIView(ReviewBaseAPIView):
    movie_field = openapi.Schema(
        'movie',
        description='movie number.',
        type=openapi.TYPE_INTEGER
    )
    comment_field = openapi.Schema(
        'comment',
        description='comment.',
        type=openapi.TYPE_STRING
    )
    score_field = openapi.Schema(
        'score',
        description='score.',
        type=openapi.TYPE_INTEGER
    )
    response = openapi.Schema(
        'response',
        type=openapi.TYPE_OBJECT,
        properties={
            'movie': movie_field,
            'comment': comment_field,
            'score': score_field}
    )

    @swagger_auto_schema(responses={
        200: response,
        400: 'Not Authentication'
    })
    def post(self, request):
        serializer = self.serializer(data=request.data)
        profile = Profile.objects.get(user=request.user)
        if serializer.is_valid():
            serializer.save(profile=profile)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ReviewDetailAPIView(ReviewBaseAPIView):
    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def is_author(self, request, pk):
        if request.user == self.get_object(pk).profile.user:
            return True
        return False

    def put(self, request, pk):
        if self.is_author(request, pk):
            review = self.get_object(pk)
            serializer = self.serializer(review, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk):
        if self.is_author(request, pk):
            review = self.get_object(pk)
            review.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)
