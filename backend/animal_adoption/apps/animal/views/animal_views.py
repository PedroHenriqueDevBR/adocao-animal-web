from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from apps.animal.validators.animal_validator import animal_is_valid_or_errors
from apps.animal.validators.block_validator import (
    block_reason_is_valid_or_errors,
    unlock_reason_is_valid_or_errors,
)
from apps.core.models import Animal, AnimalType, BlockedReason, City, Person
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from apps.animal.serializers.animal_serializers import (
    AnimalSerializer,
    CreateAnimalSerializer,
)
import json


class DashboardView(APIView):
    name = "dashboard"
    permission_classes = [IsAuthenticated]

    def get(self, request):
        context = {}
        person = request.user.person
        context["available_animals"] = self.get_available_animals(person)
        context["pedding_requests"] = self.get_pedding_requests(person)
        context["adopted_animals"] = self.get_adopted_animals(person)
        return HttpResponse(json.dumps(context))

    def get_available_animals(self, person):
        return person.animals.filter(adopted=False, blocked=False).count()

    def get_pedding_requests(self, person):
        animals = person.animals.filter(adopted=False, blocked=False)
        requests_count = 0
        for animal in animals:
            requests = animal.adoption_requests.filter(is_acepted=None).count()
            requests_count += requests
        return requests_count

    def get_adopted_animals(self, person):
        return person.animals.filter(adopted=True).count()


class AnimalListForAdoption(APIView):
    name = "animal_list_for_adoption"

    # List all animals with adoption enable in logget person region
    def get(self, request):
        animals = Animal.objects.filter(blocked=False, adopted=False)
        serializer = AnimalSerializer(animals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnimalLocationList(APIView):
    name = "animal_location_list"
    permission_classes = [IsAuthenticated]

    # List all animals with adoption enable in logget person region
    def get(self, request):
        logged_person = request.user.person
        animals = (
            Animal.objects.filter(
                blocked=False, adopted=False, owner__city=logged_person.city
            )
            .exclude(
                owner__latitude="",
                owner__longitude="",
            )
            .exclude(owner__latitude="0", owner__longitude="0")
        )
        serializer = AnimalSerializer(animals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnimalListFilter(APIView):
    name = "animal_list_filter"

    # List all animals with adoption enable in logget person region
    def patch(self, request):
        data = request.data
        animalsSearchResponse = Animal.objects.filter(blocked=False, adopted=False)
        if "type" in data:
            try:
                type = AnimalType.objects.get(id=data["type"])
                animalsSearchResponse = animalsSearchResponse.filter(animal_type=type)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        if "city" in data and data["city"] != "":
            try:
                city = City.objects.get(id=data["city"])
                animalsSearchResponse = animalsSearchResponse.filter(owner__city=city)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        if "sex" in data:
            animalsSearchResponse = animalsSearchResponse.filter(sex=data["sex"])
        serializer = AnimalSerializer(animalsSearchResponse, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnimalListAndCreate(APIView):
    name = "animal_list_and_create"
    permission_classes = [IsAuthenticated]

    # get all animals from logged user
    def get(self, request):
        person = request.user.person
        animals = person.all_animals
        serializer = AnimalSerializer(animals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Create a new animal from logget person
    def post(self, request):
        data = request.data
        errors = animal_is_valid_or_errors(data)
        if len(errors) > 0:
            return Response({"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
        data["owner"] = request.user.person.pk
        creator_serializer = CreateAnimalSerializer(data=data)
        if creator_serializer.is_valid():
            creator_serializer.save()
            return Response(creator_serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(
            creator_serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE
        )


class AnimalShow(APIView):
    name = "animal-show"

    # Select data from animal (if logged person is wouner)
    def get(self, request, pk):
        try:
            animal = Animal.objects.get(pk=pk)
            assert animal.blocked == False
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = AnimalSerializer(animal, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnimalEditAndDelete(APIView):
    name = "animal_edit_and_delete"
    permission_classes = [IsAuthenticated]

    # Select data from animal (if logged person is wouner)
    def get(self, request, pk):
        try:
            animal = Animal.objects.get(pk=pk)
            assert animal.owner == request.user.person
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = AnimalSerializer(animal, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Update data from animal (if logged person is wouner)
    def put(self, request, pk):
        try:
            animal = Animal.objects.get(pk=pk)
            assert animal.owner == request.user.person
            data = request.data
            errors = animal_is_valid_or_errors(data)
            if len(errors) > 0:
                return Response(
                    {"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE
                )
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        data["owner"] = request.user.person.pk
        serializer = CreateAnimalSerializer(animal, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    # Delete animal (if logged person is wouner)
    def delete(self, request, pk):
        try:
            animal = Animal.objects.get(pk=pk)
            assert animal.owner == request.user.person
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        animal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BlockAnimal(APIView):
    name = "block_animal"
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        person = request.user.person
        data = request.data

        try:
            animal = Animal.objects.get(pk=pk)
            assert animal.owner == person or person.is_moderator
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if animal.blocked == True:
            errors = ["Animal já encontra-se bloqueado"]
            if len(errors) > 0:
                return Response(
                    {"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE
                )

        if animal.owner == person:
            animal.blocked = True
            animal.save()
        elif person.is_moderator:
            errors = block_reason_is_valid_or_errors(data)
            if len(errors) > 0:
                return Response(
                    {"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE
                )
            reason = data["reason"]
            animal.block(person, reason)
        return Response(status=status.HTTP_200_OK)


class UnlockAnimal(APIView):
    name = "unlock_animal"
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        person = request.user.person
        try:
            animal = Animal.objects.get(pk=pk)
            assert animal.owner == person or person.is_moderator
            blocks = BlockedReason.objects.filter(blocked_animal=animal)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        errors = unlock_reason_is_valid_or_errors(animal, blocks, person)
        if len(errors) > 0:
            return Response({"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

        if animal.owner == person:
            animal.blocked = False
            animal.save()
        elif person.is_moderator:
            animal.blocked = False
            blocks.delete()
            animal.save()
        return Response(status=status.HTTP_200_OK)


class AnimalsFromOwner(APIView):
    name = "animal_from_owner"

    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            import pdb

            pdb.set_trace()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        animals = user.person.animals.filter(blocked=False)
        serializer = AnimalSerializer(animals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
