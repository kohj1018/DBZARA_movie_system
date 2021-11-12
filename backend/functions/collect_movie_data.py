from datetime import date, timedelta
import os

from django.core.files import File

import requests
from movie_system import secret_settings
from movie.models import Movie, Actor, Director, Distributor, Image, Genre


class KobisAPI:
    BASE_URL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json'

    def __init__(self):
        self.start_date = date(2018, 1, 1)
        self.SECRET_KEY = secret_settings.KOBIS_SECRET_KEY
        self.ITEM_PAGE = 10
        self.tmdb = TMDBAPI()

    def collect_daily_movie(self):
        data = requests.get(KobisAPI.BASE_URL, params={
            'key': self.SECRET_KEY,
            'itemPerPage': self.ITEM_PAGE,
            'targetDt': str(self.start_date).replace('-', '')
        })
        return data.json()['boxOfficeResult']['dailyBoxOfficeList']

    def parse_schedule_data(self):
        elements = self.collect_daily_movie()
        return [(Movie.objects.get(kobis_id=element['movieCd']), int(int(element['showCnt']) / 7)) for element in elements], self.start_date

    def parse_movie_data(self):
        elements = self.collect_daily_movie()
        for element in elements:
            movie, created = Movie.objects.get_or_create(
                kobis_id=element['movieCd'],
                defaults={
                    'name': element['movieNm'],
                    'running_time': 0,
                    'summary': '',
                    'opening_date': element['openDt'],
                    'closing_date': self.start_date
                }
            )
            if created:
                movie_id = self.tmdb.get_movie_id_by_name(name=element['movieNm'])
                self.tmdb.get_movie_detail(movie_id, movie)
                self.tmdb.get_movie_credits(movie_id, movie)
                # self.tmdb.get_movie_videos(movie_id, movie)
                movie.tmdb_id = movie_id
                movie.save()
            else:
                movie.closing_date = self.start_date

        self.start_date = self.start_date + timedelta(days=1)


class TMDBAPI:
    BASE_URL = 'https://api.themoviedb.org/3'
    IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

    def __init__(self):
        self.SECRET_KEY = secret_settings.TMDB_SECRET_KEY
        self.language = 'kr'

    def get_movie_id_by_name(self, name):
        path = '/search/movie'
        data = requests.get(TMDBAPI.BASE_URL + path, params={
            'api_key': self.SECRET_KEY,
            'language': self.language,
            'query': name
        }).json()
        return data['results'][0]['id']

    def get_movie_videos(self, movie_id, movie):
        path = f'/movie/{movie_id}/videos'
        data = requests.get(TMDBAPI.BASE_URL + path, params={
            'api_key': self.SECRET_KEY,
            'language': self.language
        }).json()
        return data

    def get_movie_detail(self, movie_id, movie):
        path = f'/movie/{movie_id}'
        data = requests.get(TMDBAPI.BASE_URL + path, params={
            'api_key': self.SECRET_KEY,
            'language': self.language,
            'append_to_response': 'video'
        }).json()
        movie.running_time = data['runtime']
        movie.tmdb_id = movie_id
        movie.imdb_id = data['imdb_id']
        movie.summary = data['overview']
        poster_path = data['poster_path']
        if poster_path:
            poster_image = File(open(f'{movie_id}_poster.jpg', 'wb'))
            response = requests.get(TMDBAPI.IMAGE_URL + poster_path)
            poster_image.write(response.content)
            poster = Image.objects.create(category=1)
            poster.image.save(f'{movie_id}_poster.jpg', File(open(f'{movie_id}_poster.jpg', 'rb')))
            movie.images.add(poster)
            os.remove(f'{movie_id}_poster.jpg')

        backdrop_path = data['backdrop_path']
        if backdrop_path:
            backdrop_image = File(open(f'{movie_id}_backdrop.jpg', 'wb'))
            response = requests.get(TMDBAPI.IMAGE_URL + backdrop_path)
            backdrop_image.write(response.content)
            backdrop = Image.objects.create(category=2)
            backdrop.image.save(f'{movie_id}_backdrop.jpg', File(open(f'{movie_id}_backdrop.jpg', 'rb')))
            movie.images.add(backdrop)
            os.remove(f'{movie_id}_backdrop.jpg')

        genres = data['genres']
        for element in genres:
            genre_name = element['name']
            genre, created = Genre.objects.get_or_create(
                name=genre_name
            )
            movie.genres.add(genre)

        distributors = data['production_companies']
        for element in distributors:
            distributor_id = element['id']
            distributor_name = element['name']
            logo_path = element['logo_path']
            distributor, created = Distributor.objects.get_or_create(
                distributor_id=distributor_id,
                defaults={
                    'name': distributor_name,
                }
            )
            if created and logo_path:
                logo_image = open(f'{distributor_id}.jpg', 'wb')
                response = requests.get(TMDBAPI.IMAGE_URL + logo_path)
                logo_image.write(response.content)
                distributor.image.save(f'{distributor_id}.jpg', File(open(f'{distributor_id}.jpg', 'rb')))
                os.remove(f'{distributor_id}.jpg')
            movie.distributors.add(distributor)
        movie.save()

    def get_movie_credits(self, movie_id, movie):
        path = f'/movie/{movie_id}/credits'
        data = requests.get(TMDBAPI.BASE_URL + path, params={
            'api_key': self.SECRET_KEY,
            'language': self.language
        })
        if data.status_code != 200:
            return
        data = data.json()
        actors = data['cast']
        for element in actors:
            actor_id = element['id']
            name = element['name']
            character_name = element['character']
            profile_image = element['profile_path']
            actor, created = Actor.objects.get_or_create(
                code=actor_id,
                defaults={
                    'name': name
                }
            )
            if created and profile_image:
                actor_image = open(f'{actor_id}.jpg', 'wb')
                response = requests.get(TMDBAPI.IMAGE_URL + profile_image)
                actor_image.write(response.content)
                actor.image.save(f'{actor_id}.jpg', File(open(f'{actor_id}.jpg', 'rb')))
                os.remove(f'{actor_id}.jpg')
            movie.actors.add(actor, through_defaults={
                'character_name': character_name
            })

        directors = data['crew']
        for element in directors:
            director_id = element['id']
            name = element['name']
            profile_image = element['profile_path']
            director, created = Director.objects.get_or_create(
                code=director_id,
                defaults={
                    'name': name
                }
            )
            if created and profile_image:
                director_image = open(f'{director_id}.jpg', 'wb')
                response = requests.get(TMDBAPI.IMAGE_URL + profile_image)
                director_image.write(response.content)
                director.image.save(f'{director_id}.jpg', File(open(f'{director_id}.jpg', 'rb')))
                os.remove(f'{director_id}.jpg')
            movie.directors.add(director)
        movie.save()

