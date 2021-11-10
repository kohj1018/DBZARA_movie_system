from random import randint, choice
import json

from django.core.management.base import BaseCommand
from cinema.models import Cinema, Theater, Seat
from functions.collect_cinema_data import NaverMapAPI


class Command(BaseCommand):
    help = 'this command create user'

    def __init__(self):
        self.naver_api = NaverMapAPI()
        self.two_dimension_seat = []
        self.three_dimension_seat = []

    def handle(self, *args, **options):
        self.create_seat()
        print('-- 좌석 생성 완료 --')
        with open('cinema/management/commands/data.json', encoding='UTF-8-SIG') as json_file:
            cinemas = json.load(json_file)['cinemas']
            for element in cinemas:
                latitude, longitude = self.naver_api.get_geo_by_location(element['주소'])
                cinema_name = element['영화상영관명'].replace('메가박스 ', '메가박스').replace('메가박스', '디비자라 ')
                cinema, created = Cinema.objects.get_or_create(
                    name=cinema_name,
                    defaults={
                        'main_region': element['광역단체'],
                        'sub_region': element['기초단체'],
                        'address': element['주소'],
                        'latitude': latitude,
                        'longitude': longitude,
                        'grade': (5 - int((int(element['총 좌석수'].replace(',', '')) / 400)))
                    }
                )
                if created:
                    print(f'--{cinema.name} 생성완료--')
                    two_dimension_count = int(element['2D 상영관수'])
                    three_dimension_count = int(element['3D 상영관수'])
                    count = 1
                    while Theater.objects.filter(cinema=cinema, category='2D').count() < two_dimension_count:
                        Theater.objects.get_or_create(
                            cinema=cinema,
                            seat=choice(self.two_dimension_seat),
                            defaults={
                                'name': f'{count} 관',
                                'category': '2D',
                                'floor': randint(1, 9),
                            }
                        )
                        count += 1

                    while Theater.objects.filter(cinema=cinema, category='3D').count() < three_dimension_count:
                        Theater.objects.get_or_create(
                            cinema=cinema,
                            seat=choice(self.two_dimension_seat),
                            defaults={
                                'name': f'{count} 관',
                                'category': '3D',
                                'floor': randint(1, 9),
                            }
                        )
                        count += 1
                    print(f'--{cinema.name}의 상영관 2D: {two_dimension_count}개, 3D: {three_dimension_count}개 생성완료--')

    def create_seat(self):
        while Seat.objects.count() < 20:
            columns = randint(7, 13)
            rows = randint(10, 20)
            Seat.objects.get_or_create(
                columns=columns,
                rows=rows
            )
        for seat in Seat.objects.all():
            if seat.columns >= 10 and seat.rows >= 10:
                self.three_dimension_seat.append(seat)
            self.two_dimension_seat.append(seat)
