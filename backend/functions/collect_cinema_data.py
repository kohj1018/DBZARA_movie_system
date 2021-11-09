from movie_system import secret_settings
import requests


class NaverMapAPI:
    BASE_URL = 'https://naveropenapi.apigw.ntruss.com'

    def __init__(self):
        self.API_KEY = secret_settings.NAVER_API
        self.SECRET_KEY = secret_settings.NAVER_SECRET_KEY

    def get_geo_by_location(self, location):
        path = '/map-geocode/v2/geocode'
        response = requests.get(NaverMapAPI.BASE_URL + path, headers={
            'X-NCP-APIGW-API-KEY-ID': self.API_KEY,
            'X-NCP-APIGW-API-KEY': self.SECRET_KEY
        }, params={
            'query': location
        }).json()

        try:
            latitude, longitude = response['addresses'][0]['x'], response['addresses'][0]['y']

        except IndexError:
            latitude, longitude = 0, 0

        return latitude, longitude

