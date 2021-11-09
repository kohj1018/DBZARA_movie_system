from random import randint
from faker import Faker
from datetime import datetime, tzinfo
from django.core.management.base import BaseCommand
from django_seed import Seed
from accounts.models import User
import warnings
warnings.filterwarnings("ignore")


class Command(BaseCommand):
    help = 'this command create user'

    def add_arguments(self, parser):
        parser.add_argument('--total', default=1, type=int)
        parser.add_argument('--generation', default=1, type=int)
        parser.add_argument('--gender', default=1, type=bool)

    def handle(self, *args, **options):
        total = options.get('total')
        generation = options.get('generation')
        gender = options.get('gender')

        MIN_AGE = generation
        # 50대 이상의 경우 100세까지를 default로 한다.
        MAX_AGE = generation+10 if generation >= 50 else 100
        # gender가 True이면 남자, False이면 여자의 데이터를 생성한다.
        GENDER = 'M' if gender else 'F'

        seeder = Seed.seeder()
        seeder.add_entity(User, total, {
            "password": lambda x: seeder.faker.password(),
            "last_login": lambda x: seeder.faker.date_time_this_year(),
            "first_name": lambda x: Faker("ko_KR").first_name(),
            "last_name": lambda x: Faker("ko_KR").last_name_male() if gender else Faker("ko_KR").last_name_female(),
            "email": lambda x: seeder.faker.email(),
            'is_staff': False,
            'is_active': False,
            "date_joined": lambda x: seeder.faker.date_time_this_decade(),
            "gender": GENDER,
            'birth_date': lambda x: seeder.faker.date_of_birth(None, MIN_AGE, MAX_AGE),
            'is_manager': False,
        })

        seeder.execute()
        self.stdout.write(self.style.SUCCESS(
            f"{total} users have been created."))
