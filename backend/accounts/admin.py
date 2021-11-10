from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from accounts.models import User, Employee, Department, Profile, Grade
# Register your models here.


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    pass


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    pass


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['id', 'cinema', 'user', 'belong']
    pass


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'full_department_name', 'department']
