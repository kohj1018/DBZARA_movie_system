from django.core.exceptions import ValidationError


def validate_score(score):
    if not (0 <= score <= 10):
        raise ValidationError
