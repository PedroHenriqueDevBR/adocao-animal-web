from django.contrib import admin
from .models import Person, State, City, AnimalType, Animal, AnimalPhoto, VaccineBook, BlockedReason, AdoptionRequest

admin.site.register(Person)
admin.site.register(State)
admin.site.register(City)
admin.site.register(AnimalType)
admin.site.register(Animal)
admin.site.register(AnimalPhoto)
admin.site.register(VaccineBook)
admin.site.register(BlockedReason)
admin.site.register(AdoptionRequest)
