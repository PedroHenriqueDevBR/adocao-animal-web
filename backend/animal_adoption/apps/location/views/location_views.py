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
from apps.location.serializers.state_serializers import (
    CreateStateSerializer,
    StateSerializer,
)


# List lcoations (States with Cities)
class LocationList(APIView):
    name = "location_list"

    def get(self, request):
        states = State.objects.all()
        state_serializer = StateSerializer(states, many=True)
        return Response(state_serializer.data, status=status.HTTP_200_OK)


# Create a new State
class StateCreate(APIView):
    name = "state_create"
    permissions = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        form_errors = state_is_valid_or_errors(request.data)
        if len(form_errors) > 0:
            return Response(
                {"errors": form_errors}, status=status.HTTP_406_NOT_ACCEPTABLE
            )
        serializer = CreateStateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, data=status.HTTP_201_CREATED)
        return Response(serializer.errors, data=status.HTTP_406_NOT_ACCEPTABLE)


# Modify some state
class StateModify(APIView):
    name = "state_modify"
    permissions = [IsAuthenticated, IsAdminUser]

    def get_state_from_database(self, pk):
        try:
            return State.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        state = self.get_state_from_database(pk)
        serializer = StateSerializer(state, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        state = self.get_state_from_database(pk)
        serializer = CreateStateSerializer(state, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, pk):
        state = self.get_state_from_database(pk)
        state.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Create a new City
class CityCreate(APIView):
    name = "city_create"
    permissions = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        form_errors = city_is_valid_or_errors(request.data)
        if len(form_errors) > 0:
            return Response(
                {"errors": form_errors}, status=status.HTTP_406_NOT_ACCEPTABLE
            )
        serializer = CreateCitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, data=status.HTTP_201_CREATED)
        return Response(serializer.errors, data=status.HTTP_406_NOT_ACCEPTABLE)


# Modify some city
class CityModify(APIView):
    name = "city_modify"
    permissions = [IsAuthenticated, IsAdminUser]

    def get_city_from_database(self, pk):
        try:
            return City.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        city = self.get_city_from_database(pk)
        serializer = CitySerializer(city, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        city = self.get_city_from_database(pk)
        serializer = CreateCitySerializer(city, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, pk):
        city = self.get_city_from_database(pk)
        city.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
