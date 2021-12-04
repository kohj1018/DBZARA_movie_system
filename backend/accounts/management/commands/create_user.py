from faker import Faker
from django.core.management.base import BaseCommand
from django_seed import Seed

from accounts.models import User, Profile
import warnings
warnings.filterwarnings("ignore")

CONTEXT = {
    'M': {
        '10': 11700,
        '20': 20800,
        '30': 28600,
        '40': 35100,
        '50': 35100
    },
    'F': {
        '10': 10400,
        '20': 19500,
        '30': 26000,
        '40': 35100,
        '50': 40300
    }
}


class Command(BaseCommand):
    help = 'this commands create user'

    def add_arguments(self, parser):
        parser.add_argument('--total', default=1, type=int)
        parser.add_argument('--generation', default=1, type=int)
        parser.add_argument('--gender', default=1, type=bool)
        parser.add_argument('--all', default=0, type=bool)

    # TODO: CREATE PROFILE
    def handle(self, *args, **options):
        is_all = options.get('all')
        if is_all:
            for generation in range(10, 51, 10):
                MIN_AGE = generation
                MAX_AGE = generation+10 if generation >= 50 else 100
                for GENDER in ['M', 'F']:
                    total = CONTEXT.get(GENDER).get(str(MIN_AGE))
                    seeder = Seed.seeder()
                    seeder.add_entity(User, total, {
                        "password": lambda x: seeder.faker.password(),
                        "last_login": lambda x: seeder.faker.date_time_this_year(),
                        "first_name": lambda x: Faker("ko_KR").first_name(),
                        "last_name": lambda x: Faker("ko_KR").last_name_male() if gender else Faker(
                            "ko_KR").last_name_female(),
                        "email": lambda x: seeder.faker.email(),
                        'is_staff': False,
                        'is_active': False,
                        "date_joined": lambda x: seeder.faker.date_time_this_decade(),
                        "gender": GENDER,
                        'birth_date': lambda x: seeder.faker.date_of_birth(None, MIN_AGE, MAX_AGE),
                        'is_manager': False,
                    })
            users = User.objects.all()
            for user in users:
                Profile.objects.create(user=user)

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
