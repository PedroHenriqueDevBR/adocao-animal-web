from django.db.models import fields
from apps.core.models import AnimalPhoto
from rest_framework.serializers import ModelSerializer

# TODO: need test
class PhotoSerializer(ModelSerializer):
    class Meta:
        model = AnimalPhoto
        fields = [
            'id',
            'photo',
            'animal',
        ]
