from apps.core.models import City, State
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from apps.location.serializers.city_serializers import (
    CitySerializer,
    CreateCitySerializer,
)
from apps.location.validators.location_validators import (
    city_is_valid_or_errors,
    state_is_valid_or_errors,
)
from apps.location.serializers.state_serializers import StateSerializer


# List lcoations (States with Cities)
class LocationList(APIView):
    name = "location_list"

    def get(self, request):
        states = State.objects.all()
        state_serializer = StateSerializer(states, many=True)
        return Response(state_serializer.data, status=status.HTTP_200_OK)


class CityList(APIView):
    name = "city_list"

    def get(self, request):
        cities = City.objects.all()
        city_serializer = CitySerializer(cities, many=True)
        return Response(city_serializer.data, status=status.HTTP_200_OK)


# Create a new State
class StateCreate(APIView):
    name = "state_create"
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        form_errors = state_is_valid_or_errors(request.data)
        if len(form_errors) > 0:
            return Response(
                {"errors": form_errors}, status=status.HTTP_406_NOT_ACCEPTABLE
            )
        serializer = StateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, data=status.HTTP_406_NOT_ACCEPTABLE)


# Modify some state
class StateModify(APIView):
    name = "state_modify"
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, pk):
        try:
            state = State.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = StateSerializer(state, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        try:
            state = State.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = StateSerializer(state, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, pk):
        try:
            state = State.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        state.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Create a new City
class CityCreate(APIView):
    name = "city_create"
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        form_errors = city_is_valid_or_errors(request.data)
        if len(form_errors) > 0:
            return Response(
                {"errors": form_errors}, status=status.HTTP_406_NOT_ACCEPTABLE
            )
        serializer = CreateCitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


# Modify some city
class CityModify(APIView):
    name = "city_modify"
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, pk):
        try:
            city = City.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CitySerializer(city, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        try:
            city = City.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CreateCitySerializer(city, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, pk):
        try:
            city = City.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        city.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
