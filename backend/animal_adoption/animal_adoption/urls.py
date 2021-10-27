from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/", include("apps.account.urls")),
    path("location/", include("apps.location.urls")),
    path("animal/", include("apps.animal.urls")),
    path("adoption/", include("apps.adoption.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
