from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly


class AnimalListForAdoption(APIView):
    name = 'animal_list_for_adoption'
    permission_classes = [IsAuthenticatedOrReadOnly]

    # List all animals with adoption enable in logget person region
    def get(self, request):
        pass

class AnimalListAndCreate(APIView):
    name = 'animal_list_and_create'
    permission_classes = [IsAuthenticated]

    # get all animals from logged user
    def get(self, request):
        pass

    # Create a new animal from logget person
    def post(self, request):
        pass

class AnimalEditAndDelete(APIView):
    name = 'animal_edit_and_delete'
    permission_classes = [IsAuthenticated]

    # Select data from animal (if logged person is wouner)
    def get(self, request, pk):
        pass

    # Update data from animal (if logged person is wouner)
    def put(self, request, pk):
        pass

    # Delete animal (if logged person is wouner)
    def delete(self, request, pk):
        pass