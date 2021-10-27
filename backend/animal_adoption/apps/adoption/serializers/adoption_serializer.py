from django.db import models
from apps.core.models import AdoptionRequest
from apps.animal.serializers.animal_serializers import AnimalSerializer
from apps.account.serializers.user_serializers import UserSerializer
from rest_framework.serializers import ModelSerializer


class AdoptionSerializer(ModelSerializer):

    requester = UserSerializer(many=False, read_only=True)

    class Meta:
        model = AdoptionRequest
        fields = [
            "id",
            "create_at",
            "is_acepted",
            "requester",
            "animal",
        ]


class AdoptionCreateSerializer(ModelSerializer):

    class Meta:
        model = AdoptionRequest
        fields = [
            "id",
            "create_at",
            "is_acepted",
            "requester",
            "animal",
        ]
