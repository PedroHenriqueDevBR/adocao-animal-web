from apps.account.serializers.user_serializers import UserSerializer
from apps.animal.serializers.animal_type_serializers import AnimalTypeSerializer
from apps.animal.serializers.photo_serializers import PhotoSerializer
from apps.animal.serializers.vaccine_serializer import VaccineSerializer
from apps.core.models import Animal, AnimalType
from rest_framework.serializers import ModelSerializer, SlugRelatedField

# TODO: need test
class AnimalSerializer(ModelSerializer):
    animal_type = AnimalTypeSerializer(many=False, read_only=True)
    owner = UserSerializer(many=False, read_only=True)
    all_vaccines = VaccineSerializer(many=True, read_only=True)
    all_photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Animal
        fields = [
            "id",
            "name",
            "breed",
            "age",
            "sex",
            "adopted",
            "blocked",
            "create_at",
            "owner",
            "animal_type",
            "all_photos",
            "all_vaccines",
        ]


# TODO: need test
class CreateAnimalSerializer(ModelSerializer):
    class Meta:
        model = Animal
        fields = [
            "id",
            "name",
            "breed",
            "age",
            "sex",
            "owner",
            "animal_type",
        ]
