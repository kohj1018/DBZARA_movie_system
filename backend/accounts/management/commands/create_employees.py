from random import randint, random, choice
from datetime import timedelta, datetime
import json

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db.models import Q
from django_seed import Seed

from accounts.models import Employee, Department
from cinema.models import Cinema


class Command(BaseCommand):
    help = 'this command create employee'

    # def add_arguments(self, parser):
    #     parser.add_argument('--total', default=1, type=int)
    #     parser.add_argument('--department', default=1, type=int)

    def handle(self, *args, **options):
        total = options.get('total')
        all_user = get_user_model().objects.exclude(is_staff=True)
        all_cinema = Cinema.objects.all()
        departments = self.create_department()
        cinemas = sum([[element] * randint((7 - element.grade) * 10, (8 - element.grade) * 10) for element in all_cinema], [])

        print(len(cinemas))
        for cinema in cinemas:
            user = choice(all_user)
            employee, created = Employee.objects.get_or_create(
                user=user,
                defaults={
                    "cinema": cinema,
                    "belong": choice(departments),
                    "register_date": user.date_joined,
                    "salary": 0
                }
            )
            if created:
                user.is_employee = True
                user.save()
        
        # seeder.execute()
        # self.stdout.write(self.style.SUCCESS(
        #     f"{total} users have been created."))

    def create_department(self):
        with open('accounts/management/commands/departments.json', encoding='UTF-8-SIG') as json_file:
            departments = json.load(json_file)
            count = 0
            for department in departments:
                count += 1
                Department.objects.get_or_create(
                    id=department['pk'],
                    defaults={
                        'name': department['fields']['name'],
                        'department': None if department['fields']['department'] is None else Department.objects.get(pk=int(department['fields']['department']))
                    }
                )
            print(f'-- 부서 데이터 {count}개 생성 완료 --')
        return Department.objects.exclude(department__isnull=True)