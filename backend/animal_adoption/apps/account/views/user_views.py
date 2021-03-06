from apps.core.models import City, Person
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import User
from apps.account.validators.user_validators import (
    image_data_is_valid_or_errors,
    person_register_is_valid_or_errors,
    person_update_is_valid_or_errors,
)
from apps.account.serializers.user_serializers import (
    UpdatePersonSerializer,
    UserSerializer,
)


class AllPersonsView(APIView):
    name = "all-persons-view"
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        persons = Person.objects.all()
        serializer = UserSerializer(persons, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PersonDataAndUpdateView(APIView):
    name = "person-data-and-update-view"
    permission_classes = [IsAuthenticated]

    def get(self, request):
        person = request.user.person
        serializer = UserSerializer(person, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        data = request.data
        errors = person_update_is_valid_or_errors(data)
        if len(errors) > 0:
            return Response({"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
        user = request.user
        person = user.person
        if "name" in data:
            user.first_name = data["name"]
            user.save()
        if "password" in data:
            user.set_password(data["password"])
        if "contact" in data:
            person.contact = data["contact"]
        if "latitude" in data:
            person.latitude = data["latitude"]
        if "longitude" in data:
            person.longitude = data["longitude"]
        if "city" in data:
            city = City.objects.get(pk=data["city"])
            person.city = city
        person.save()
        return Response(status=status.HTTP_202_ACCEPTED)


class PersonImage(APIView):
    name = "person_image"
    permission_classes = [IsAuthenticated]

    # Update person image
    def put(self, request):
        data = request.data
        person = request.user.person
        errors = image_data_is_valid_or_errors(data)
        if len(errors) > 0:
            return Response(errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        person.remove_image(save=False)
        person.image = data["image"]
        person.save()
        serializer = UserSerializer(person)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # delete person image
    def delete(self, request):
        person = request.user.person
        person.remove_image(save=True)
        serializer = UserSerializer(person)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


# Register new persons
class PersonRegisterView(APIView):
    name = "person-register-view"

    def create_person(self, person_data):
        user = User.objects.create_user(
            username=person_data["username"],
            first_name=person_data["name"],
            password=person_data["password"],
        )
        city = City.objects.get(pk=person_data["city"])
        person = Person.objects.create(
            contact=person_data["contact"],
            city=city,
            user=user,
        )
        person_serializer = UserSerializer(person)
        return Response(person_serializer.data, status=status.HTTP_201_CREATED)

    def post(self, request):
        data = request.data
        form_errors = person_register_is_valid_or_errors(data)
        if len(form_errors) > 0:
            return Response(
                {"errors": form_errors}, status=status.HTTP_406_NOT_ACCEPTABLE
            )
        return self.create_person(data)


# Select Detail from anyone
class SelectPersonDetail(APIView):
    name = "person_detail"

    def get_person_from_database(self, pk):
        try:
            return Person.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        person = self.get_person_from_database(pk)
        serializer = UserSerializer(person, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Admin user enable moderator from some person
class EnableModeratorPerson(APIView):
    name = "person_modify_enable_moderator"
    permission_classes = [IsAuthenticated, IsAdminUser]

    def put(self, request, pk):
        try:
            person = Person.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        person.is_moderator = True
        person.save()
        serializer = UserSerializer(person, many=False)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


# Admin user disable moderator from some person
class DisableModeratorPerson(APIView):
    name = "person_modify_enable_moderator"
    permission_classes = [IsAuthenticated, IsAdminUser]

    def put(self, request, pk):
        try:
            person = Person.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        person.is_moderator = False
        person.save()
        serializer = UserSerializer(person, many=False)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

class BlockPerson(APIView):
    name = "block_person"
    permission_classes = [IsAuthenticated, IsAdminUser]

    def put(self, request, pk):
        try:
            person = Person.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        user = person.user
        user.is_active = False
        user.save()
        serializer = UserSerializer(person, many=False)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


# Admin user disable moderator from some person
class UnlockPerson(APIView):
    name = "unlock_person"
    permission_classes = [IsAuthenticated, IsAdminUser]

    def put(self, request, pk):
        try:
            person = Person.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        user = person.user
        user.is_active = True
        user.save()
        serializer = UserSerializer(person, many=False)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
