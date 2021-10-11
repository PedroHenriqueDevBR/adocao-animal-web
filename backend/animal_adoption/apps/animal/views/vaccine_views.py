from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from apps.animal.serializers.vaccine_serializer import VaccineSerializer
from apps.animal.validators.vaccine_validator import vaccine_is_valid_or_errors
from apps.core.models import VaccineBook
from rest_framework.permissions import IsAuthenticated


class VaccineCreate(APIView):
    name = "vaccine_create"
    permission_classes = [IsAuthenticated]

    # Add vaccine to the animal
    def post(self, request):
        data = request.data
        errors = vaccine_is_valid_or_errors(data, request.user.person)
        if len(errors) > 0:
            return Response({"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
        creator_serializer = VaccineSerializer(data=data)
        if creator_serializer.is_valid():
            creator_serializer.save()
            return Response(creator_serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(
            creator_serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE
        )


class VaccineEditAndDelete(APIView):
    name = "vaccine_edit_and_delete"
    permission_classes = [IsAuthenticated]

    # Update data from vaccine
    def put(self, request, pk):
        try:
            vaccine = VaccineBook.objects.get(pk=pk)
            assert vaccine.animal.owner == request.user.person
            data = request.data
            errors = vaccine_is_valid_or_errors(data, request.user.person)
            if len(errors) > 0:
                return Response(
                    {"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE
                )
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = VaccineSerializer(vaccine, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    # Delete animal (if logged person is wouner)
    def delete(self, request, pk):
        try:
            vaccine = VaccineBook.objects.get(pk=pk)
            assert vaccine.animal.owner == request.user.person
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        vaccine.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
