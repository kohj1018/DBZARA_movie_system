from random import randint, choice
import json

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from accounts.models import Employee, Department
from cinema.models import Cinema


def create_department():
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


class Command(BaseCommand):
    help = 'this command create employee'

    def __init__(self):
        self.services = dict()

    def handle(self, *args, **options):
        all_user = get_user_model().objects.exclude(is_staff=True)
        all_cinema = Cinema.objects.exclude(pk=1)
        create_department()
        cinemas = sum([[element] * randint((7 - element.grade) * 10, (8 - element.grade) * 10) for element in all_cinema], [])
        count = 0
        with open('accounts/management/commands/departments.json', encoding='UTF-8-SIG') as json_file:
            departments = json.load(json_file)
            for department in departments:
                if department['fields']['department'] is not None:
                    min_salary = department['fields']['min_salary']
                    max_salary = department['fields']['min_salary']
                    if department['fields']['department'] == 43:
                        self.services[str(department['pk'])] = {
                            'min_salary': min_salary,
                            'max_salary': max_salary
                        }
                    else:
                        user = choice(all_user)
                        min_salary = int(department['fields']['min_salary'])
                        max_salary = int(department['fields']['max_salary'])
                        for _ in range(9 - (max_salary // 1000)):
                            employee, created = Employee.objects.get_or_create(
                                user=user,
                                defaults={
                                    "cinema": Cinema.objects.get(pk=1),
                                    'belong': Department.objects.get(pk=int(department['pk'])),
                                    "register_date": user.date_joined,
                                    "salary": randint(min_salary, max_salary)
                                }
                            )
                            if created:
                                count += 1
                                user.is_employee = True
                                user.save()
        print(self.services)
        for cinema in cinemas:
            user = choice(all_user)
            belong = choice(range(44, 50))
            employee, created = Employee.objects.get_or_create(
                user=user,
                defaults={
                    "cinema": cinema,
                    "belong": Department.objects.get(pk=int(belong)),
                    "register_date": user.date_joined,
                    "salary": randint(int(self.services.get(str(belong))['min_salary']), int(self.services.get(str(belong))['max_salary']))
                }
            )
            if created:
                count += 1
                user.is_employee = True
                user.save()

        print(f'-- 직원 데이터 {count}개 생성 완료 --')