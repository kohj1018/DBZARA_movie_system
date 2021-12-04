from django.views.generic import ListView

from item.models import Event


class EventListView(ListView):
    model = Event
    context_object_name = 'events'
    paginate_by = 2

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(EventListView, self).get_context_data(**kwargs)
        context['type'] = 'event'
        return context
