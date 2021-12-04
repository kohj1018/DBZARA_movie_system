from django.views.generic import ListView

from accounts.models import Employee


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
