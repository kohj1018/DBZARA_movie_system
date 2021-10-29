from dateutil.relativedelta import relativedelta

from psqlextra.partitioning import (
    PostgresPartitioningManager,
    PostgresCurrentTimePartitioningStrategy,
    PostgresTimePartitionSize,
    partition_by_current_time, PostgresPartitioningConfig,
)

from item.models import Order
from accounts.models import Mileage
from cinema.models import Reservation, Schedule

manager = PostgresPartitioningManager([
    # 3 partitions ahead, each partition is one month
    # delete partitions older than 6 months
    # partitions will be named `[table_name]_[year]_[3-letter month name]`.
    PostgresPartitioningConfig(
        model=Schedule,
        strategy=PostgresCurrentTimePartitioningStrategy(
            size=PostgresTimePartitionSize(years=1),
            count=5,
            max_age=relativedelta(years=1),
        ),
    ),
    # 6 partitions ahead, each partition is two weeks
    # delete partitions older than 8 months
    # partitions will be named `[table_name]_[year]_week_[week number]`.
    PostgresPartitioningConfig(
        model=Reservation,
        strategy=PostgresCurrentTimePartitioningStrategy(
            size=PostgresTimePartitionSize(weeks=2),
            count=6,
            max_age=relativedelta(months=8),
        ),
    ),
    # 12 partitions ahead, each partition is 5 days
    # old partitions are never deleted, `max_age` is not set
    # partitions will be named `[table_name]_[year]_[month]_[month day number]`.
    PostgresPartitioningConfig(
        model=Order,
        strategy=PostgresCurrentTimePartitioningStrategy(
            size=PostgresTimePartitionSize(wdyas=5),
            count=12,
        ),
    ),
    PostgresPartitioningConfig(
        model=Mileage,
        strategy=PostgresCurrentTimePartitioningStrategy(
            size=PostgresTimePartitionSize(years=3),
            count=3,
            max_age=relativedelta(years=4)
        ),
    ),
])

# these are the default arguments
partitioning_plan = manager.plan(
    skip_create=False,
    skip_delete=False,
    using='default'
)

# prints a list of partitions to be created/deleted
partitioning_plan.print()

# apply the plan
partitioning_plan.apply(using='default')