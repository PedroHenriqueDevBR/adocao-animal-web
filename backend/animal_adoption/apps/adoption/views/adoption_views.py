from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.adoption.validators.adoption_validator import adoption_register_is_valid_or_errors

from apps.core.models import AdoptionRequest, Animal
from apps.adoption.serializers.adoption_serializer import AdoptionCreateSerializer, AdoptionSerializer


class MyAdoptionRequests(APIView):
    name = "my_adoption_request"
    permission_classes = [IsAuthenticated]

    # Get all adoption requests from animal
    def get(self, request):
        person = request.user.person
        adoption_requests = person.my_adoption_requests.all()
        serializer = AdoptionSerializer(adoption_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnimalAdoptionRequests(APIView):
    name = "animal_adoption_request"
    permission_classes = [IsAuthenticated]

    # Get all adoption requests from animal
    def get(self, request, pk):
        try:
            animal = Animal.objects.get(pk=pk)
            assert(animal.owner == request.user.person)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        adoptions = animal.adoption_requests.all()
        serializer = AdoptionSerializer(adoptions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    # add adoption request
    def post(self, request, pk):
        person = request.user.person
        data = {'animal': pk}

        errors = adoption_register_is_valid_or_errors(data, person)
        if len(errors) > 0:
            return Response({"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        data['requester'] = person.id
        serializer = AdoptionCreateSerializer(data=data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        


class AnimalAdoptionAccept(APIView):
    name = "animal_adoption_accept"
    permission_classes = [IsAuthenticated]

    # Accept adoption request
    def put(self, request, pk, adoption_pk):
        try:
            animal = Animal.objects.get(pk=pk)
            adoption = AdoptionRequest.objects.get(pk=adoption_pk)
            assert(animal.owner == request.user.person)
            assert(adoption.animal == animal)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        adoption.accept()
        serializer = AdoptionSerializer(adoption, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnimalAdoptionReject(APIView):
    name = "animal_adoption_reject"
    permission_classes = [IsAuthenticated]

    # Recuse adoption request
    def put(self, request, pk, adoption_pk):
        try:
            animal = Animal.objects.get(pk=pk)
            adoption = AdoptionRequest.objects.get(pk=adoption_pk)
            assert(animal.owner == request.user.person)
            assert(adoption.animal == animal)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        adoption.reject()
        serializer = AdoptionSerializer(adoption, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnimalAdoptionDelete(APIView):
    name = "animal_adoption_delete"
    permission_classes = [IsAuthenticated]

    # Recuse adoption request
    def delete(self, request, pk, adoption_pk):
        try:
            animal = Animal.objects.get(pk=pk)
            adoption = AdoptionRequest.objects.get(pk=adoption_pk)
            person = request.user.person
            assert(adoption.animal == animal)
            assert(animal.owner == person or adoption.requester == person)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        adoption.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
