from rest_framework.serializers import ModelSerializer
from apps.core.models import State
from .city_serializers import CitySerializer


class StateSerializer(ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)

    class Meta:
        model = State
        fields = ["id", "name", "cities"]


class CreateStateSerializer(ModelSerializer):
    class Meta:
        model = State
        fields = ["id", "name"]
