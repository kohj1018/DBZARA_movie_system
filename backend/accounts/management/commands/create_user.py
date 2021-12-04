from faker import Faker
from django.core.management.base import BaseCommand
from django_seed import Seed

from accounts.models import User, Profile
import warnings
warnings.filterwarnings('ignore')

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

    def __init__(self):
        super(Command, self).__init__()
        self.seeder = Seed.seeder()

    def add_arguments(self, parser):
        parser.add_argument('--total', default=1, type=int)
        parser.add_argument('--generation', default=1, type=int)
        parser.add_argument('--gender', default=False, type=bool)
        parser.add_argument('--all', default=False, type=bool)

    # TODO: CREATE PROFILE
    def handle(self, *args, **options):
        is_all = options.get('all')
        if is_all:
            for generation in range(10, 51, 10):
                min_age = generation
                max_age = generation + 10 if generation <= 50 else 100
                for gender in ['M', 'F']:
                    total = CONTEXT.get(gender).get(str(min_age))
                    self.create_user(total=total, gender=gender, min_age=min_age, max_age=max_age)

        else:
            total = options.get('total')
            generation = options.get('generation')
            gender = options.get('gender')
            min_age = generation
            max_age = generation + 10 if generation <= 50 else 100
            gender = 'M' if gender else 'F'
            print(gender, total, min_age)
            self.create_user(total=total, gender=gender, min_age=min_age, max_age=max_age)

        users = User.objects.all()
        for user in users:
            Profile.objects.create(user=user)

        self.stdout.write(self.style.SUCCESS(f"{total} users have been created."))

    def create_user(self, total, gender, min_age, max_age):
        print(total, gender, min_age, max_age)
        self.seeder.add_entity(User, total, {
            "password": lambda x: self.seeder.faker.password(),
            "last_login": lambda x: self.seeder.faker.date_time_this_year(),
            "first_name": lambda x: Faker("ko_KR").first_name(),
            "last_name": lambda x: Faker("ko_KR").last_name_male() if gender else Faker("ko_KR").last_name_female(),
            "email": lambda x: self.seeder.faker.email(),
            'is_staff': False,
            'is_active': False,
            "date_joined": lambda x: self.seeder.faker.date_time_this_decade(),
            "gender": gender,
            'birth_date': lambda x: self.seeder.faker.date_of_birth(None, min_age, max_age),
            'is_manager': False,
        })
        self.seeder.execute()
