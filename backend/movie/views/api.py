from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status

from movie.models import Movie
from movie.serializers import MovieSerializer


class MovieAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query_set = Movie.objects.all()
        serializer = MovieSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
