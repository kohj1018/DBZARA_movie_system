import requests
import json
import jwt

from django.http import HttpResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from accounts.models import User
from movie_system import secret_settings


class GoogleLoginView(View):
    def get(self, request):
        google_access_token = request.GET.get('code', None)

        url = 'https://www.googleapis.com/oauth2/v4/token'

        headers = {'Content-Type': 'application/x-www-form-urlencoded'}

        body = {
            'code': f'{google_access_token}',
            'client_id': secret_settings.GOOGLE_LOGIN_ID,
            'client_secret': secret_settings.GOOGLE_LOGIN_SECRET,
            'redirect_uri': 'http://127.0.0.1:8000/accounts/login/google',
            'grant_type': 'authorization_code',
        }

        google_response = requests.post(url, headers=headers, data=body)
        return HttpResponse(f'{google_response.text}')

    def post(self, request):
        user_status = json.loads(request.body)
        print(user_status)

        print(user_status)

        user, created = User.objects.get_or_create(
            email=user_status['email'],
            defaults={
                'last_name': user_status['last_name'],
                'first_name': user_status['first_name'],
                'username': user_status['username'],
                'platform': 3,
            }
        )

        if created:
            user.set_password('google' + user.username)
            user.save()

        url = 'http://127.0.0.1:8000/accounts/auth/'

        body = {
            'username': user.username,
            'password': 'google' + user.username
        }
        jwt_token = requests.post(url, data=body)
        return HttpResponse(f'{jwt_token.text}')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(GoogleLoginView, self).dispatch(request, *args, **kwargs)


class GoogleRefreshTokenView(View):
    def post(self, request):
        token = json.loads(request.body)['token']
        url = 'https://www.googleapis.com/oauth2/v4/token'
        body = {
            'client_id': secret_settings.GOOGLE_LOGIN_ID,
            'client_secret': secret_settings.GOOGLE_LOGIN_SECRET,
            'refresh_token': token,
            'grant_type': 'refresh_token'
        }

        google_response = requests.post(url, data=body)
        google_access_token = json.loads(google_response.text)['access_token']

        return HttpResponse(f'{google_access_token}')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(GoogleRefreshTokenView, self).dispatch(request, *args, **kwargs)


class DecodeCurrentUserView(View):
    def get(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split(" ")[1]
        decode_data = jwt.decode(
            jwt=token, key=secret_settings.SECRET_KEY, algorithms=['HS256'])
        decode_data = json.dumps(decode_data)
        return HttpResponse(f'{decode_data}', content_type="application/json")