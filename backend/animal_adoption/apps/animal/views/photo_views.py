from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from apps.animal.serializers.photo_serializers import PhotoSerializer
from apps.animal.validators.photo_validator import photo_is_valid_or_errors

from apps.core.models import Animal, AnimalPhoto


class PhotoCreate(APIView):
    name = "photo_create"
    permission_classes = [IsAuthenticated]

    # Add photo to animal (limit 4 photos)
    def post(self, request):
        data = request.data
        errors = photo_is_valid_or_errors(data, request.user.person)
        if len(errors) > 0:
            return Response({"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer = PhotoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


class PhotoUpdateAndDelete(APIView):
    name = "photo_update_and_delete"
    permission_classes = [IsAuthenticated]

    # Update photo to animal (Remove current photo to add new)
    def put(self, request, pk):
        try:
            photo = AnimalPhoto.objects.get(pk=pk)
            assert photo.animal.owner == request.user.person
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = request.data
        errors = photo_is_valid_or_errors(data, request.user.person)
        if len(errors) > 0:
            return Response({"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

        photo.remove_image(save=True)
        serializer = PhotoSerializer(photo, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    # Delete photo to animal
    def delete(self, request, pk):
        try:
            photo = AnimalPhoto.objects.get(pk=pk)
            assert photo.animal.owner == request.user.person
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        photo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
