from apps.account.serializers.user_serializers import UserSerializer
from apps.core.models import Animal, AnimalType
from rest_framework.serializers import ModelSerializer, SlugRelatedField

# TODO: need test
class AnimalSerializer(ModelSerializer):
    type = SlugRelatedField(many=False, read_only=True, slug_field="name")
    owner = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Animal
        fields = [
            "name",
            "breed",
            "age",
            "sex",
            "adopted",
            "blocked",
            "create_at",
            "owner",
            "type",
            "all_photos",
            "all_vaccines",
            "all_adoption_received",
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
            "type",
        ]
