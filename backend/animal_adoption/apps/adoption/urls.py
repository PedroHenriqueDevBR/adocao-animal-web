from .views.adoption_views import *
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # IsAuthenticated
    path("", MyAdoptionRequests.as_view(), name=MyAdoptionRequests.name),
    path("<int:pk>", AnimalAdoptionRequests.as_view(), name=AnimalAdoptionRequests.name),
    path("<int:pk>/accept/<int:adoption_pk>", AnimalAdoptionAccept.as_view(), name=AnimalAdoptionAccept.name),
    path("<int:pk>/reject/<int:adoption_pk>", AnimalAdoptionReject.as_view(), name=AnimalAdoptionReject.name),
    path("<int:pk>/delete/<int:adoption_pk>", AnimalAdoptionDelete.as_view(), name=AnimalAdoptionDelete.name),
    # IsAdminUser
]
