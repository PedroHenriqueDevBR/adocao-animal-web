from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Adoção de animais",
        default_version="v1",
        description="Projeto para adoção de animais",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="pedro.henrique.particular@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('jet/', include('jet.urls', 'jet')),
    path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    path("admin/", admin.site.urls),
    path("user/", include("apps.account.urls")),
    path("location/", include("apps.location.urls")),
    path("animal/", include("apps.animal.urls")),
    path("adoption/", include("apps.adoption.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Swagger
urlpatterns += [
    url(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    url(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    url(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]
