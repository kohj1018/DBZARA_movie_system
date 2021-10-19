from django.conf import settings
from django.db import models


class Employee(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cinema = models.ForeignKey('cinema.Cinema', on_delete=models.CASCADE)
    # TODO: Rename ForeignKey Model(Department)
    belong = models.ForeignKey('Department', on_delete=models.CASCADE)
    register_date = models.DateField()
    salary = models.IntegerField(default=0)
    answers = models.ManyToManyField('cinema.Question', through='cinema.Answer')


class Department(models.Model):
    title = models.CharField(max_length=30)
    department = models.ForeignKey('self', on_delete=models.CASCADE)


# TODO: PostgreSQL Partitioning
class Attendance(models.Model):
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


class EmployeeEvaluationByUser(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    # TODO: Rename ForeignKey Model(Inquiry)
    inquiry = models.ForeignKey('cinema.Question', on_delete=models.CASCADE)
    evaluate1 = models.IntegerField()
    evaluate2 = models.IntegerField()


class EmployeeEvaluationByEmployer(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    employer = models.ForeignKey(Employee, on_delete=models.CASCADE)
    evaluate1 = models.IntegerField()
    evaluate2 = models.IntegerField()
    evaluate3 = models.IntegerField()


