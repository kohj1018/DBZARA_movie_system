from django.conf import settings
from django.db import models


# TODO: PostgreSQL Indexes
class Employee(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cinema = models.ForeignKey('Cinema', on_delete=models.CASCADE)
    # TODO: Rename ForeignKey Model(Department)
    belong = models.ForeignKey('Department', on_delete=models.CASCADE)
    register_date = models.DateField()
    salary = models.IntegerField(default=0)


class Department(models.Model):
    title = models.CharField(max_length=30)
    department = models.ForeignKey('self', on_delete=models.CASCADE)


# TODO: PostgreSQL Partitioning
# TODO: PostgreSQL Indexes
class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    result = models.CharField(max_length=10)


class EmployeeEvaluationByUser(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    # TODO: Rename ForeignKey Model(Inquiry)
    inquiry = models.ForeignKey('Inquiry', on_delete=models.CASCADE)
    evaluate1 = models.IntegerField()
    evaluate2 = models.IntegerField()


class EmployeeEvaluationByEmployer(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    employer = models.ForeignKey(Employee, on_delete=models.CASCADE)
    evaluate1 = models.IntegerField()
    evaluate2 = models.IntegerField()
    evaluate3 = models.IntegerField()


