from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly


class PhotoCreate(APIView):
    name = 'photo_create'
    permission_classes = [IsAuthenticated]

    # Add photo to animal (limit 4 photos)
    def post(self, request, pk):
        pass

class PhotoUpdateAndDelete(APIView):
    name = 'photo_update_and_delete'
    permission_classes = [IsAuthenticated]

    # Update photo to animal (Remove current photo to add new)
    def put(self, request, pk):
        pass

    # Delete photo to animal
    def delete(self, request, pk):
        pass