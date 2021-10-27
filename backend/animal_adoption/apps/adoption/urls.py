from .views.adoption_views import *
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # IsAuthenticated
    path("<int:pk>", AnimalAdoptionRequests.as_view(), name=AnimalAdoptionRequests.name),
    path("<int:pk>/request/<int:adoption_pk>", AnimalAdoptionModify.as_view(), name=AnimalAdoptionModify.name),
    # IsAdminUser
]
