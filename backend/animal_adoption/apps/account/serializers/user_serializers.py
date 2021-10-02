from apps.core.models import Person
from rest_framework.serializers import ModelSerializer
from apps.location.serializers.city_serializers import CitySerializer, CreateCitySerializer


class UserSerializer(ModelSerializer):
    city = CreateCitySerializer(many=False, read_only=True)

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
            "contact",
            "city",
            "user",
        ]


class UpdatePersonSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = [
            "image",
            "contact",
            "latitude",
            "longitude",
            "city",
        ]


class UpdatePersonIamgeSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = ["image"]
