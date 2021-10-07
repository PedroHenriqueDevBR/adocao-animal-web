from apps.animal.views.animal_type_views import *
from django.urls import path

urlpatterns = [
    # Open
    path("type", AnimalTypeCreate.as_view(), name=AnimalTypeCreate.name),
    path("type/<int:pk>", AnimalTypeEdit.as_view(), name=AnimalTypeEdit.name),
    path("all_types", AnimalTypeList.as_view(), name=AnimalTypeList.name),
]
