from calendar import monthrange

from django.db.models import F
from django.views.generic import ListView

from accounts.models import Employee, Attendance, EmployeeEvaluationByEmployer


class EmployeeListView(ListView):
    model = Employee
    context_object_name = 'employees'
    paginate_by = 20

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(EmployeeListView, self).get_context_data(**kwargs)
        if self.request.user.is_staff:
            context['title'] = '전체 직원 정보'
        else:
            context['title'] = f'{self.request.user.employee.cinema.name} 직원 정보'
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_staff:
            return queryset
        else:
            if self.request.user.is_manager:
                return queryset.filter(cinema=self.request.user.employee.cinema)
        raise PermissionError


class EmployeeAttendanceListView(ListView):
    model = Attendance

    def get_queryset(self):
        queryset = super().get_queryset()
        # if self.request.user.is_staff:
        #     queryset = queryset
        # else:
        #     if self.request.user.is_manager:
        #         queryset = queryset.filter(employee__cinema=self.request.user.employee.cinema).order_by('id')
        #     else:
        #         raise PermissionError
        employees = Employee.objects.filter(cinema=self.request.user.employee.cinema)
        is_searched = dict()
        queryset = queryset.filter(employee__in=employees).order_by('id')
        # queryset = queryset.filter(date__year=2021, date__month=12, date__day=5)
        employees = queryset.values('employee')
        attendances = []
        for employee in employees:
            print(employee)
            if not is_searched.get(employee['employee']):
                attendances.append(queryset.filter(employee__id=employee['employee']).order_by('date'))
                is_searched[employee['employee']] = True
        query_set = Attendance.objects.none()
        return attendances

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data()
        context['days_of_month'] = range(1, monthrange(2021, 11)[1] + 1)
        return context


class EmployerEvaluationListView(ListView):
    model = EmployeeEvaluationByEmployer
    context_object_name = 'evaluations'
    template_name = 'accounts/evaluation_list.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(EmployerEvaluationListView, self).get_context_data(**kwargs)
        if self.request.user.is_staff:
            context['title'] = '전체 직원 평가 정보'
            context['employees'] = Employee.objects.all()
        else:
            context['title'] = f'{self.request.user.employee.cinema.name} 직원 평가 정보'
            context['employees'] = Employee.objects.filter(cinema=self.request.user.employee.cinema)
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(employee__cinema=self.request.user.employee.cinema)

