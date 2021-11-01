from django.core.management.base import BaseCommand
from django_seed import Seed
from accounts.models import User


class Command(BaseCommand):
    help = 'this command create user'

    def add_arguments(self, parser):
        parser.add_argument('--number', default=1, type=int)

    def handle(self, *args, **options):
        number = options.get('number')

        seeder = Seed.seeder()
        seeder.add_entity(User, number, {
            'is_active': False,
            'is_staff': False,
            'is_manager': False
        })

        seeder.execute()
