from django.db import models
from django.contrib.auth.models import User
import uuid, os


def upload_image_formater(instance, filename):
    return f"{str(uuid.uuid4())}-{filename}"


class State(models.Model):
    name = models.CharField(max_length=150)


class City(models.Model):
    name = models.CharField(max_length=150)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name="cities")


class Person(models.Model):
    image = models.ImageField(upload_to=upload_image_formater, blank=True, null=True)
    name = models.CharField(max_length=150)
    contact = models.CharField(max_length=20)
    latitude = models.CharField(max_length=250, default="")
    longitude = models.CharField(max_length=250, default="")
    is_moderator = models.BooleanField(default=False)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="residents")
    user = models.OneToOneField(User, related_name="person", on_delete=models.CASCADE)

    @property
    def name(self):
        return self.user.first_name

    @property
    def is_active(self):
        return self.user.is_active

    def remove_image(self, *args, **kwargs):
        if os.path.isfile(self.image.path):
            os.remove(self.image.path)


class AnimalType(models.Model):
    name = models.CharField(max_length=150)


class Animal(models.Model):
    name = models.CharField(max_length=150)
    breed = models.CharField(max_length=150)
    age = models.IntegerField()
    sex = models.CharField(max_length=1)
    adopted = models.BooleanField(default=False)
    blocked = models.BooleanField(default=False)
    create_at = models.DateField(auto_now_add=True)
    owner = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="animals")
    type = models.ForeignKey(
        AnimalType, on_delete=models.CASCADE, related_name="linked_animals"
    )

    def block(self, person, reason):
        reason = BlockedReason(
            person_requester=person, blocked_animal=self, reason=reason
        )
        reason.save()


class AnimalPhoto(models.Model):
    photo = models.ImageField(upload_to=upload_image_formater, blank=True, null=True)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name="photos")

    def delete(self, *args, **kwargs):
        if os.path.isfile(self.photo.path):
            os.remove(self.photo.path)
        super().delete()


class VaccineBook(models.Model):
    vaccine_name = models.CharField(max_length=150)
    date = models.DateField(auto_now_add=True)
    animal = models.ForeignKey(
        Animal, on_delete=models.CASCADE, related_name="vaccines"
    )


class BlockedReason(models.Model):
    create_at = models.DateField(auto_now_add=True)
    reason = models.TextField(max_length=500)
    person_requester = models.ForeignKey(
        Person, on_delete=models.CASCADE, related_name="blocks_sent"
    )
    blocked_animal = models.ForeignKey(
        Animal, on_delete=models.CASCADE, related_name="blocks_received"
    )


class AdoptionRequest(models.Model):
    create_at = models.DateField(auto_now_add=True)
    is_acepted = models.BooleanField(null=True, blank=True)
    requester = models.ForeignKey(Person, on_delete=models.CASCADE)
    animal = models.ForeignKey(
        Animal, on_delete=models.CASCADE, related_name="adoption_requests"
    )

    def accept(self):
        self.animal.adopted = True
        self.is_acepted = True
        self.save()

    def reject(self):
        self.is_acepted = False
        self.save()
