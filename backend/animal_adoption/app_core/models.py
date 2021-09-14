from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class State(models.Model):
    name = models.CharField(max_length=150)

class City(models.Model):
    name = models.CharField(max_length=150)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='cities')

class Person(models.Model):
    name = models.CharField(max_length=150)
    contact = models.CharField(max_length=20)
    latitude = models.CharField(max_length=50, default='')
    longitude = models.CharField(max_length=50, default='')
    isModerator = models.BooleanField(default=False)

    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='residents')
    user = models.OneToOneField(User, related_name='person', on_delete=models.CASCADE)

class AnimalType(models.Model):
    name = models.CharField(max_length=150)

class Animal(models.Model):
    name = models.CharField(max_length=150)
    breed = models.CharField(max_length=150)
    birth_day = models.CharField(max_length=150)
    sex = models.CharField(max_length=1)
    adopted = models.BooleanField(default=False)
    blocked = models.BooleanField(default=False)

    animal_type = models.ForeignKey(AnimalType, on_delete=models.CASCADE, related_name='linked_animals')
    pet_owner = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='animals')

    def block(self, person, reason):
        reason = BlockedReason(person_requester=person, blocked_animal=self, reason=reason)
        reason.save()

class VaccineBook(models.Model):
    vaccine_name = models.CharField(max_length=150)
    date = models.CharField(max_length=50, default=datetime.now().fromisoformat)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name='vaccines')

class BlockedReason(models.Model):
    person_requester = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='blocks_sent')
    blocked_animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name='blocks_received')
    reason = models.TextField(max_length=500)

class AdoptionRequest(models.Model):
    date = models.DateField(auto_created=True)
    is_acepted = models.BooleanField(null=True, blank=True)
    requester = models.ForeignKey(Person, on_delete=models.CASCADE)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name='adoption_requests')

    def accept(self):
        self.animal.adopted = True
        self.is_acepted = True
        self.save()

    def reject(self):
        self.is_acepted = False
        self.save()
