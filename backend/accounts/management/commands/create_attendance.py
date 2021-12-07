from datetime import datetime, date, timedelta
from random import randint, choice

from django.core.management.base import BaseCommand
from accounts.models import Employee, Attendance

def random_attendance():
    number = randint(1, 100)
    if number < 90:
        return 1
    if number < 95:
        return 3
    if number < 98:
        return 2
    if number < 100:
        return 5
    return 4


class Command(BaseCommand):
    help = 'this command create attendance command.'

    def __init__(self):
        super(Command, self).__init__()
        self.employees = Employee.objects.all()

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        start_date = date.today()
        end_date = date(2020, 1, 1)
        while start_date > end_date:
            start_date = date(start_date.year, start_date.month, start_date.day)
            normal, not_normal = 0, 0
            for employee in self.employees:
                normal += 1
                start_time = datetime(start_date.year, start_date.month, start_date.day)
                if start_date.weekday() in [5, 6]:
                    Attendance.create(
                        employee=employee,
                        start_time=start_time,
                        end_time=start_time,
                        status=3
                    )
                    not_normal += 1
                else:
                    status = random_attendance()
                    if employee.cinema.id == 1:
                        start_time = start_time + timedelta(hours=7) + timedelta(minutes=(randint(50, 100)))

                    else:
                        start_time = start_time + timedelta(
                            hours=choice(list(range(0, 4)) + list(range(7, 23)))) + timedelta(
                            minutes=(randint(1, 59)))

                    if status == 1:
                        end_time = start_time + timedelta(hours=9) + timedelta(minutes=randint(30, 60))

                    elif status == 2:
                        end_time = start_time + timedelta(minutes=randint(30, 100))

                    else:
                        start_time = datetime(start_date.year, start_date.month, start_date.day)
                        end_time = datetime(start_date.year, start_date.month, start_date.day)
                        not_normal += 1

                    Attendance.create(
                        employee=employee,
                        start_time=start_time,
                        end_time=end_time,
                        status=status
                    )

            print(f'--{start_date} 출근 기록 - 정상 출근: {normal - not_normal}, 비정상 출근: {not_normal} --')
            start_date = start_date - timedelta(days=1)
