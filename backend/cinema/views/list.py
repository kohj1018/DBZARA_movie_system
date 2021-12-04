from datetime import date, timedelta, datetime

from django.views.generic import ListView
from django.db.models import Q

from cinema.models import Cinema, Schedule, Stock


class CinemaListView(ListView):
    model = Cinema
    context_object_name = 'cinemas'
    paginate_by = 20

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(CinemaListView, self).get_context_data(**kwargs)
        context['title'] = '영화관'
        return context


# class CinemaStockListView(ListView):
#     model = Stock



class CinemaScheduleListView(ListView):
    model = Schedule

    def get_queryset(self):
        query_set = super().get_queryset()
        cinema_number = int(self.request.GET.get('cinema', '4'))
        cinema = Cinema.objects.get(pk=cinema_number)
        search_date = date(*[int(element) for element in self.request.GET.get('d', '2021-11-30').split('-')])
        return query_set.filter(cinema=cinema, datetime__year=search_date.year, datetime__month=search_date.month,
                                datetime__day=search_date.day).order_by('theater', 'datetime')

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data()
        cinema = int(self.request.GET.get('cinema', '4'))
        theaters = Cinema.objects.get(pk=cinema).theater_set.all().order_by('id')
        hours = list(range(0, 24))
        search_date = datetime(*[int(element) for element in self.request.GET.get('d', '2021-11-30').split('-')])
        schedules = []
        for idx, theater in enumerate(theaters):
            schedules.append([])
            prev_datetime = search_date
            for hour in hours:
                schedule = self.get_queryset().filter(theater=theater,
                                                      datetime__range=[search_date + timedelta(hours=hour),
                                                                       search_date + timedelta(hours=hour) + timedelta(minutes=59)]
                                                      ).exclude(movie__running_time=0)
                if schedule.count() > 0:
                    start_datetime = schedule.first().datetime
                    schedules[idx].append({
                        'colspan': int((start_datetime - prev_datetime) / timedelta(minutes=5))
                    })
                    schedules[idx].append({
                        'name': schedule.first().movie.name,
                        'image': schedule.first().movie.backdrop,
                        'datetime': schedule.first().datetime.strftime("%H:%M"),
                        'colspan': (schedule.first().movie.running_time // 5)
                    })
                    prev_datetime = start_datetime + timedelta(minutes=schedule.first().movie.running_time // 5 * 5)
            schedules[idx].append({
                'colspan': int((search_date + timedelta(hours=24) - prev_datetime) / timedelta(minutes=5))
            })
        headers = [{'title': '상영관', 'colspan': 6}]
        for hour in hours:
            headers.append({'title': f'{str(hour).zfill(2)}:00', 'colspan': 12})
        context['headers'] = headers
        context['schedules'] = schedules
        context['counts'] = range(24 * 12 + 6)

        return context
