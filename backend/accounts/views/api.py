from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from accounts.models import Profile
from accounts.serializers import (
    ProfileMovieSerializer, ProfileGenreSerializer, ProfileActorSerializer, ProfileDirectorSerializer, ProfileDistributorsSerializer
)


class ProfileBaseAPIView(RetrieveAPIView):
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = None



