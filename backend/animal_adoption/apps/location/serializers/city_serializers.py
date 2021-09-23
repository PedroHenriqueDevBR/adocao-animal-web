from rest_framework.serializers import ModelSerializer, SlugRelatedField
from apps.core.models import City


class CitySerializer(ModelSerializer):
    state = SlugRelatedField(many=False, read_only=True, slug_field="name")

    class Meta:
        model = City
        fields = ["id", "name", "state"]


class CreateCitySerializer(ModelSerializer):
    class Meta:
        model = City
        fields = ["id", "name", "state"]
