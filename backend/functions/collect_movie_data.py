from datetime import date, timedelta
from random import randint
import requests
import os

from django.core.files import File

from movie_system import secret_settings
from movie.models import Movie, Actor, Director, Distributor, Image, Genre
from functions.crawling_movie_review import CrawlingMovieReview


class KobisAPI:
    BASE_URL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest'

    def __init__(self):
        self.start_date = date(2021, 12, 1)
        self.default_date = date(2020, 1, 1)
        self.SECRET_KEY = secret_settings.KOBIS_SECRET_KEY
        self.ITEM_PAGE = 10
        self.tmdb = TMDBAPI()
        self.review = CrawlingMovieReview()

    def collect_daily_movie(self):
        path = '/boxoffice/searchDailyBoxOfficeList.json'
        data = requests.get(KobisAPI.BASE_URL + path, params={
            'key': self.SECRET_KEY,
            'itemPerPage': self.ITEM_PAGE,
            'targetDt': str(self.start_date).replace('-', '')
        })
        return data.json()['boxOfficeResult']['dailyBoxOfficeList']

    def parse_schedule_data(self):
        elements = self.collect_daily_movie()
        return [(Movie.objects.get(kobis_id=element['movieCd']), int(element['showCnt']) // 200, int(element['audiCnt']) // 200) for element in elements], self.start_date

    def parse_movie_data(self):
        elements = self.collect_daily_movie()
        for element in elements:
            movie, created = Movie.objects.get_or_create(
                kobis_id=element['movieCd'],
                defaults={
                    'name': element['movieNm'],
                    'running_time': 0,
                    'summary': '',
                    'opening_date': element['openDt'] if element['openDt'] != ' ' else self.default_date,
                    'closing_date': self.start_date + timedelta(days=14)
                }
            )
            if created:
                self.get_movie_detail(movie, element['movieCd'])
                movie_id = self.tmdb.get_movie_id_by_name(name=element['movieNm'])
                if movie_id != 0:
                    self.tmdb.get_movie_detail(movie_id, movie)
                    actors, directors = self.get_movie_credits(element['movieCd'])
                    self.tmdb.get_movie_credits(movie_id, movie, actors, directors)

                # movie_code = self.review.get_movie_code_by_title(movie.name)
                # self.review.get_comment_by_code(code=movie_code, movie=movie)
                # self.tmdb.get_movie_videos(movie_id, movie)
            else:
                movie.closing_date = self.start_date + timedelta(days=14)
                movie.save()

        self.start_date = self.start_date + timedelta(days=1)

    def get_movie_info(self, movie_id):
        path = '/movie/searchMovieInfo.json'
        return requests.get(KobisAPI.BASE_URL + path, params={
            'key': self.SECRET_KEY,
            'movieCd': movie_id
        }).json()['movieInfoResult']['movieInfo']

    def get_movie_detail(self, movie, movie_id):
        data = self.get_movie_info(movie_id=movie_id)
        try:
            movie.watch_grade = data['audits'][0]['watchGradeNm']
            movie.running_time = data['showTm']

        except TypeError as error:
            print(error)
            movie.running_time = 0

        except IndexError as error:
            print(error)
            movie.watch_grade = '미정'

        finally:
            movie.save()

    def get_movie_credits(self, movie_id):
        data = self.get_movie_info(movie_id)
        actor_dicts = dict()
        director_dicts = dict()
        actor_data = data['actors']
        for actor in actor_data:
            eng_name = actor['peopleNmEn'].replace('-', '').replace(' ', '').lower()
            kor_name = actor['peopleNm']
            character_name = actor['cast']
            actor_dicts[eng_name] = [kor_name, character_name]
        director_data = data['directors']
        for director in director_data:
            eng_name = director['peopleNmEn'].replace('-', '').replace(' ', '').lower()
            kor_name = director['peopleNm']
            director_dicts[eng_name] = kor_name
        return actor_dicts, director_dicts


class TMDBAPI:
    BASE_URL = 'https://api.themoviedb.org/3'
    IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

    def __init__(self):
        self.SECRET_KEY = secret_settings.TMDB_SECRET_KEY
        self.language = 'ko'

    def get_not_open_movies(self):
        path = '/movie/upcoming'
        data = requests.get(TMDBAPI.BASE_URL + path, params={
            'api_key': self.SECRET_KEY,
            'language': self.language,
            'region': 'kr'
        }).json()
        movies = data['results']
        for movie in movies:
            movie_id = int(movie['id'])
            movie, created = Movie.objects.get_or_create(
                tmdb_id=movie['id'],
                defaults={
                    'kobis_id': movie['id'],
                    'name': movie['title'],
                    'running_time': 0,
                    'summary': movie['overview'],
                    'opening_date': movie['release_date'],
                    'closing_date': movie['release_date']
                }
            )
            if created:
                self.get_movie_detail(movie_id, movie)
                self.get_movie_credits(movie_id, movie, {}, {})
                # movie.closing_date = movie.opening_date + timedelta(days=randint(14, 21))
                movie.save()

    def get_movie_id_by_name(self, name):
        path = '/search/movie'
        data = requests.get(TMDBAPI.BASE_URL + path, params={
            'api_key': self.SECRET_KEY,
            'language': self.language,
            'query': name
        }).json()
        try:
            movie_id = data['results'][0]['id']
        except IndexError:
            movie_id = 0
        finally:
            return movie_id

    def get_movie_detail(self, movie_id, movie):
        path = f'/movie/{movie_id}'
        data = requests.get(TMDBAPI.BASE_URL + path, params={
            'api_key': self.SECRET_KEY,
            'language': self.language,
            'append_to_response': 'videos,images'
        }).json()
        movie.running_time = data['runtime'] if data['runtime'] is not None else 0
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

        videos = data['videos']
        if videos['results']:
            for element in videos['results']:
                key = element['key']
                site = element['site']
                video_type = element['type']
                movie.videos.create(
                    key=key,
                    site=site,
                    category=video_type
                )

        images = data['images']
        if images['posters']:
            for idx, element in enumerate(images['posters']):
                poster_image = File(open(f'{movie_id}-{idx}_other.jpg', 'wb'))
                response = requests.get(TMDBAPI.IMAGE_URL + poster_path)
                poster_image.write(response.content)
                poster = Image.objects.create(category=3)
                poster.image.save(f'{movie_id}-{idx}_other.jpg', File(open(f'{movie_id}-{idx}_other.jpg', 'rb')))
                movie.images.add(poster)
                os.remove(f'{movie_id}-{idx}_other.jpg')

        movie.save()

    def get_movie_credits(self, movie_id, movie, actor_dict, director_dict):
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
            lower_name = name.replace('-', '').replace(' ', '').lower()
            if lower_name in actor_dict:
                name = actor_dict[lower_name][0]
                character_name = actor_dict[lower_name][1]
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
            lower_name = name.replace('-', '').replace(' ', '').lower()
            if lower_name in director_dict:
                name = director_dict[lower_name]
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

