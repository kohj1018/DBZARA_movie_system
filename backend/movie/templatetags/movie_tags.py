from django import template


register = template.Library()


@register.filter(name='paginator_range')
def paginator_range(value):
    pass
