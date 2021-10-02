from .views.user_views import *
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # Open
    path("register", PersonRegisterView.as_view(), name=PersonRegisterView.name),
    path("login/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("<int:pk>/detail", SelectPersonDetail.as_view(), name=SelectPersonDetail.name),
    # IsAuthenticated
    path("", PersonDataAndUpdateView.as_view(), name=PersonDataAndUpdateView.name),
    path("image/", PersonImage.as_view(), name=PersonImage.name),
    # IsAdminUser
    path("<int:pk>/moderator/enable", EnableModeratorPerson.as_view(), name=EnableModeratorPerson.name),
    path("<int:pk>/moderator/disable", DisableModeratorPerson.as_view(), name=DisableModeratorPerson.name),
]
