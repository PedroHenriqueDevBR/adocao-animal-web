from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from apps.animal.serializers.animal_type_serializers import AnimalTypeSerializer
from apps.animal.validators.animal_type_validator import animal_type_is_valid_or_errors
from apps.core.models import AnimalType, Animal, AnimalPhoto


class AnimalTypeListWithAnimals(APIView):
    name = "animal_type_list_with_animals"
    permission_classes = [IsAuthenticatedOrReadOnly]

    # Return all animal type with animals with adoption enable
    def get(self, request):
        pass


class AnimalTypeList(APIView):
    name = "animal_type_list_and_create"

    # List all animal types
    def get(self, request):
        types = AnimalType.objects.all()
        serializer = AnimalTypeSerializer(types, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnimalTypeCreate(APIView):
    name = "animal_type_create"

    def post(self, request):
        errors = animal_type_is_valid_or_errors(request.data)
        if len(errors) > 0:
            return Response({"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer = AnimalTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


class AnimalTypeEdit(APIView):
    name = "animal_type_edit"
    permission_classes = [IsAuthenticated, IsAdminUser]

    # Select animal type by ID
    def get(self, request, pk):
        try:
            animal_type = AnimalType.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = AnimalTypeSerializer(animal_type, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Update animal type data
    def put(self, request, pk):
        try:
            animal_type = AnimalType.objects.get(pk=pk)
            errors = animal_type_is_valid_or_errors(request.data)
            if len(errors) > 0:
                return Response(
                    {"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE
                )
            serializer = AnimalTypeSerializer(data=request.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = AnimalTypeSerializer(animal_type, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    # Delete animal type by ID
    def delete(self, request, pk):
        try:
            animal_type = AnimalType.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        animal_type.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
