import requests
import json

from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.mixins import RetrieveModelMixin, CreateModelMixin
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView

from accounts.models import Profile, Grade


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_status = json.loads(request.body)

        user, created = get_user_model().objects.get_or_create(
            email=user_status['email'],
            defaults={
                'last_name': user_status['last_name'],
                'first_name': user_status['first_name'],
                'username': user_status['username'],
                'platform': 3,
                'gender': user_status['gender']
            }
        )

        if created:
            Profile.objects.create(
                user=user,
                grade=Grade.objects.get(pk=1)
            )
            user.set_password(user_status['platform'] + user.username)
            user.save()

        url = 'http://127.0.0.1:8000/api/v1/token/'

        body = {
            'username': user.username,
            'password': user_status['platform'] + user.username
        }

        jwt_token = requests.post(url, data=body).json()
        return Response(jwt_token, status=status.HTTP_200_OK)


class KakaoLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        tokens = json.loads(request.body)
        print(tokens)

        url = 'https://kapi.kakao.com/v2/user/me'
        response = requests.get(url, headers={
            'Authorization': f"Bearer {tokens.get('access_token')}"
        })

        return Response(response.json())
