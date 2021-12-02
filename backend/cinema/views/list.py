from django.views.generic import ListView

from cinema.models import Cinema


class CinemaListView(ListView):
    model = Cinema
    context_object_name = 'cinemas'
    paginate_by = 20

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(CinemaListView, self).get_context_data(**kwargs)
        context['title'] = '영화관'
        return context
