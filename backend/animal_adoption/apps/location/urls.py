from .views.location_views import *
from django.urls import path

urlpatterns = [
    # Open
    path("", LocationList.as_view(), name=LocationList.name),
    path("cities", CityList.as_view(), name=CityList.name),
    # IsAdminUser
    path("state", StateCreate.as_view(), name=StateCreate.name),
    path("state/<int:pk>", StateModify.as_view(), name=StateModify.name),
    path("city", CityCreate.as_view(), name=CityCreate.name),
    path("city/<int:pk>", CityModify.as_view(), name=CityModify.name),
]
