from rest_framework import serializers

from accounts.models import User, Profile, CouponHold, NonCouponHold, Grade, Mileage, EmployeeEvaluationByUser


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'birth_date', 'age', 'is_social', 'full_name', 'gender']


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['name', 'benefits']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    grade = GradeSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'grade', 'image', 'mileage']


class CouponHoldSerializer(serializers.ModelSerializer):
    class Meta:
        model = CouponHold
        fields = ['coupon', 'expiration_date', 'is_used']


class NonCouponHoldSerializer(serializers.ModelSerializer):
    class Meta:
        model = NonCouponHold
        fields = ['non_coupon']


class MileageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mileage
        fields = ['order', 'point', 'content']
