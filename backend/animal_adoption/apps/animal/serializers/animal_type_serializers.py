from rest_framework.serializers import ModelSerializer
from apps.core.models import AnimalType

# TODO: need test
class AnimalTypeSerializer(ModelSerializer):
    class Meta:
        model = AnimalType
        fields = ['id', 'name']
