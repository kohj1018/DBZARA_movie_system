from datetime import date, timedelta
from movie_system import secret_settings
import requests


class MovieAPI:
    BASE_URL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json'

    def __init__(self):
        self.date = date(2018, 1, 1)
        self.SECRET_KEY = secret_settings.MOVIE_SECRET_KEY
        self.ITEM_PAGE = 10

    def collect_daily_movie(self):
        data = requests.get(MovieAPI.BASE_URL, params={
            'key': self.SECRET_KEY,
            'itemPerPage': self.ITEM_PAGE,
            'targetDt': str(self.date).replace('-', '')
        })
        return data
