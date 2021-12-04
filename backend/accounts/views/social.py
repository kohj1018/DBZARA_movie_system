import requests
import json

from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.views import APIView

from accounts.models import Profile, Grade


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_status = json.loads(request.body).get('results')

        user, created = get_user_model().objects.get_or_create(
            email=user_status['email'],
            defaults={
                'last_name': user_status.get('givenName', ''),
                'first_name': user_status.get('familyName', ''),
                'username': user_status.get('googleId', ''),
                'platform': 3,
                'gender': user_status.get('gender', 'M')
            }
        )

        if created:
            Profile.objects.create(
                user=user,
                grade=Grade.objects.get(pk=1)
            )
            user.set_password(str(user.platform) + str(user.username))
            user.save()

        url = 'http://127.0.0.1:8000/api/v1/token/'

        body = {
            'username': user.username,
            'password': str(user.platform) + str(user.username)
        }

        jwt_token = requests.post(url, data=body).json()
        return Response(jwt_token, status=status.HTTP_200_OK)


class KakaoLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_status = json.loads(request.body).get('results')

        kakao_account = user_status.get('kakao_account')

        user, created = get_user_model().objects.get_or_create(
            email=kakao_account['email'],
            defaults={
                'last_name': kakao_account.get('profile').get('nickname'),
                'first_name': '',
                'username': user_status.get('id'),
                'platform': 4,
                'gender': 'M' if kakao_account['gender'] == 'male' else 'F',
            }
        )
        if created:
            Profile.objects.create(
                user=user,
                grade=Grade.objects.get(pk=1)
            )
            user.set_password(str(user.platform) + str(user.username))
            user.save()

        url = 'http://127.0.0.1:8000/api/v1/token/'

        body = {
            'username': user.username,
            'password': str(user.platform) + str(user.username)
        }

        jwt_token = requests.post(url, data=body).json()
        return Response(jwt_token, status=status.HTTP_200_OK)
