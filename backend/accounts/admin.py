from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from accounts.models import User, Employee, Department
# Register your models here.


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    pass


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'full_department_name', 'department']
