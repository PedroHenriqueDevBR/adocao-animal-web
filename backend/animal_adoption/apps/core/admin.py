from django.contrib import admin
from .models import (
    Person,
    State,
    City,
    AnimalType,
    Animal,
    AnimalPhoto,
    VaccineBook,
    BlockedReason,
    AdoptionRequest,
)


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "image",
        "contact",
        "latitude",
        "longitude",
        "is_moderator",
        "is_sponsor",
        "city",
        "user",
    )


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "state",
    )


@admin.register(AnimalType)
class AnimalTypeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )


@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "breed",
        "age",
        "sex",
        "adopted",
        "blocked",
        "create_at",
        "owner",
        "animal_type",
    )


@admin.register(AnimalPhoto)
class AnimalPhotoAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "photo",
        "animal",
    )


@admin.register(VaccineBook)
class VaccineBookAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "vaccine_name",
        "date",
        "animal",
    )


@admin.register(BlockedReason)
class BlockedReasonAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "create_at",
        "reason",
        "person_requester",
        "blocked_animal",
    )


@admin.register(AdoptionRequest)
class AdoptionRequestAdmi(admin.ModelAdmin):
    list_display = (
        "id",
        "create_at",
        "is_acepted",
        "requester",
        "animal",
    )
