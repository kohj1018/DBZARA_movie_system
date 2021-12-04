from django import template

register = template.Library()


@register.filter
def multiple(val1, val2):
    return val1 * val2