from apps.animal.views.animal_type_views import *
from apps.animal.views.animal_views import *
from django.urls import path

from apps.animal.views.animal_views import AnimalListFilter, AnimalListForAdoption

urlpatterns = [
    # Open
    path("type", AnimalTypeCreate.as_view(), name=AnimalTypeCreate.name),
    path("", AnimalListForAdoption.as_view(), name=AnimalListForAdoption.name),
    # path("filter/", AnimalListFilter.as_view(), name=AnimalListFilter.name), TODO: Implementar o filtro dos animais
    # IsAuthenticated
    path("my", AnimalListAndCreate.as_view(), name=AnimalListAndCreate.name),
    path("my/<int:pk>", AnimalEditAndDelete.as_view(), name=AnimalEditAndDelete.name),
    # Admin
    path("all_types", AnimalTypeList.as_view(), name=AnimalTypeList.name),
    path("type/<int:pk>", AnimalTypeEdit.as_view(), name=AnimalTypeEdit.name),
]
