from rest_framework.serializers import ModelSerializer
from apps.core.models import VaccineBook

# TODO: need test
class VaccineSerializer(ModelSerializer):
    class Meta:
        model = VaccineBook
        fields = ["id", "vaccine_name", "date", "animal"]
