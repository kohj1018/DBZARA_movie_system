from django.conf import settings
from django.db import models

from psqlextra.types import PostgresPartitioningMethod
from psqlextra.models import PostgresPartitionedModel


class Employee(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cinema = models.ForeignKey('cinema.Cinema', on_delete=models.CASCADE)
    # TODO: Rename ForeignKey Model(Department)
    belong = models.ForeignKey('Department', on_delete=models.CASCADE)
    register_date = models.DateField()
    salary = models.IntegerField(default=0)


class Department(models.Model):
    name = models.CharField(max_length=30)
    department = models.ForeignKey('self', on_delete=models.CASCADE, related_name='direct_department', blank=True, null=True)

    @property
    def full_department_name(self):
        department_name = self.name
        root = self
        while root.department is not None:
            root = root.department
            department_name = f'{root.name} - {department_name}'
        return department_name

    def __str__(self):
        return self.full_department_name


class Attendance(PostgresPartitionedModel):
    class PartitioningMeta:
        method = PostgresPartitioningMethod.RANGE
        key = ['date']

        class Meta:
            indexes = [
                models.Index(fields=['employee'], name='attendance_employee_idx')
            ]

    RESULT_CHOICES = [
        (0, '미정'),
        (1, '정상 출근'),
        (2, '조퇴'),
        (3, '결근'),
        (4, '연차')
    ]
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    # FIXME: date 속성을 추가해야될지 고민할 필요 있음.
    date = models.DateField(auto_now_add=True)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    status = models.IntegerField(choices=RESULT_CHOICES, default=0)
    is_confirmed = models.BooleanField(default=False)


class EmployeeEvaluationByUser(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='evaluation_by_user')
    profile = models.ForeignKey('accounts.Profile', on_delete=models.CASCADE, related_name='profile')
    inquiry = models.ForeignKey('cinema.Question', on_delete=models.CASCADE)
    evaluate1 = models.IntegerField()
    evaluate2 = models.IntegerField()


class EmployeeEvaluationByEmployer(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='evaluation_by_employer')
    employer = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='employer')
    evaluate1 = models.IntegerField()
    evaluate2 = models.IntegerField()
    evaluate3 = models.IntegerField()


