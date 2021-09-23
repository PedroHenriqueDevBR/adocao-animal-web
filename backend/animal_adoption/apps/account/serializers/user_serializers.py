from apps.account.serializers.city_serializers import CitySerializer
from django.db.models import fields
from apps.core.models import Person
from rest_framework.serializers import ModelSerializer, SlugRelatedField


class UserSerializer(ModelSerializer):
    city = CitySerializer(many=False, read_only=True)

    class Meta:
        model = Person
        fields = [
            "id",
            "image",
            "name",
            "username",
            "contact",
            "latitude",
            "longitude",
            "is_moderator",
            "city",
        ]


class CreatePersonSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = [
            "id",
            "image",
            "contact",
        ]


class UpdatePersonSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = [
            "name",
            "image",
            "contact",
            "latitude",
            "longitude",
            "city",
        ]
