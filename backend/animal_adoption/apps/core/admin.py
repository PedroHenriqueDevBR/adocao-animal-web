from django.contrib import admin
from .models import Person, State, City

# Register your models here.
admin.site.register(Person)
admin.site.register(State)
admin.site.register(City)
