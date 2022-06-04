from django.urls import path
from apps.animal.views.animal_type_views import *
from apps.animal.views.animal_views import *
from apps.animal.views.photo_views import *
from apps.animal.views.vaccine_views import *


urlpatterns = [
    # Open
    path("type", AnimalTypeCreate.as_view(), name=AnimalTypeCreate.name),
    path("", AnimalListForAdoption.as_view(), name=AnimalListForAdoption.name),
    path("location/", AnimalLocationList.as_view(), name=AnimalLocationList.name),
    path("filter/", AnimalListFilter.as_view(), name=AnimalListFilter.name),
    path("owner/<int:pk>", AnimalsFromOwner.as_view(), name=AnimalsFromOwner.name),
    # IsAuthenticated
    path("<int:pk>", AnimalShow.as_view(), name=AnimalShow.name),
    path("my", AnimalListAndCreate.as_view(), name=AnimalListAndCreate.name),
    path("my/<int:pk>", AnimalEditAndDelete.as_view(), name=AnimalEditAndDelete.name),
    path("vaccine", VaccineCreate.as_view(), name=VaccineCreate.name),
    path(
        "vaccine/<int:pk>",
        VaccineEditAndDelete.as_view(),
        name=VaccineEditAndDelete.name,
    ),
    path("photo", PhotoCreate.as_view(), name=PhotoCreate.name),
    path(
        "photo/<int:pk>",
        PhotoUpdateAndDelete.as_view(),
        name=PhotoUpdateAndDelete.name,
    ),
    # IsModerator
    path("<int:pk>/block", BlockAnimal.as_view(), name=BlockAnimal.name),
    path("<int:pk>/unlock", UnlockAnimal.as_view(), name=UnlockAnimal.name),
    # Admin
    path("all_types", AnimalTypeList.as_view(), name=AnimalTypeList.name),
    path("type/<int:pk>", AnimalTypeEdit.as_view(), name=AnimalTypeEdit.name),
    path("type/get/<int:pk>", AnimalTypeGet.as_view(), name=AnimalTypeGet.name),
]
