from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly


class AnimalTypeListWithAnimals(APIView):
    name = 'animal_type_list_with_animals'
    permission_classes = [IsAuthenticatedOrReadOnly]

    # Return all animal type with animals with adoption enable
    def get(self, request):
        pass


class AnimalTypeEditListAndCreate(APIView):
    name = 'animal_type_edit_list_and_create'
    permission_classes = [IsAuthenticated, IsAdminUser]

    # List all animal types
    def get(self, request):
        pass

    # Create a new animal type
    def post(self, request):
        pass


class AnimalTypeEdit(APIView):
    name = 'animal_type_edit'
    permission_classes = [IsAuthenticated, IsAdminUser]

    # Select animal type by ID
    def get(self, request, pk):
        pass

    # Update animal type data
    def put(self, request, pk):
        pass

    # Delete animal type by ID
    def delete(self, request, pk):
        pass

