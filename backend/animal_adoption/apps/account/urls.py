from .views.user_views import *
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # Open
    path("register", PersonRegisterView.as_view(), name=PersonRegisterView.name),
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("<int:pk>/detail", SelectPersonDetail.as_view(), name=SelectPersonDetail.name),
    # IsAuthenticated
    path("", PersonDataView.as_view(), name=PersonDataView.name),
    # IsAdminUser
    path("", EnableModeratorPerson.as_view(), name=EnableModeratorPerson.name),
    path("", DisableModeratorPerson.as_view(), name=DisableModeratorPerson.name),
]
