from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/", include("apps.account.urls")),
    path("location/", include("apps.location.urls")),
]
