from django.core.management.base import BaseCommand

from item.models import Event, Benefit, Item, Coupon, NonCoupon


class Command(BaseCommand):
    help = 'this command create event'

    def __init__(self):
        super().__init__()
        self.tickets = Item.objects.filter(category__in=[3, 7])
        self.stores = Item.objects.filter(category__main_category=3)

    def handle(self, *args, **options):

        pass

