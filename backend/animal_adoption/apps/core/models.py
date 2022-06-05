from django.db import models
from django.contrib.auth.models import User
import uuid, os


def upload_image_formater(instance, filename):
    return f"{str(uuid.uuid4())}-{filename}"


class State(models.Model):
    name = models.CharField(max_length=150)

    @property
    def all_cities(self):
        return self.cities.all()

    class Meta:
        verbose_name = "State"
        verbose_name_plural = "States"

    def __str__(self) -> str:
        return "{}".format(
            self.name,
        )


class City(models.Model):
    name = models.CharField(max_length=150)
    state = models.ForeignKey(
        State,
        on_delete=models.CASCADE,
        related_name="cities",
    )

    @property
    def all_persons(self):
        return self.residents.all()

    @property
    def all_not_adopted_animals(self):
        animals = []
        persons = self.all_persons
        for person in persons:
            animals.extend(person.all_not_adopted_animals)
        return animals

    class Meta:
        verbose_name = "City"
        verbose_name_plural = "Cities"

    def __str__(self) -> str:
        return "{}".format(
            self.name,
        )


class Person(models.Model):
    contact = models.CharField(max_length=20)
    latitude = models.CharField(max_length=250, default="")
    longitude = models.CharField(max_length=250, default="")
    is_moderator = models.BooleanField(default=False)
    is_sponsor = models.BooleanField(default=False)
    image = models.ImageField(
        upload_to=upload_image_formater,
        blank=True,
        null=True,
    )
    city = models.ForeignKey(
        City,
        on_delete=models.CASCADE,
        related_name="residents",
    )
    user = models.OneToOneField(
        User,
        related_name="person",
        on_delete=models.CASCADE,
    )

    @property
    def name(self):
        return self.user.first_name

    @property
    def username(self):
        return self.user.username

    @property
    def password(self):
        return self.user.password

    @property
    def is_active(self):
        return self.user.is_active

    @property
    def is_admin(self):
        return self.user.is_superuser

    @property
    def all_animals(self):
        return self.animals.all()

    @property
    def all_unlocked_animals(self):
        return self.animals.filter(blocked=False)

    @property
    def all_not_adopted_animals(self):
        return self.animals.filter(adopted=False)

    def has_image(self):
        return self.image != None and self.image != ""

    def remove_image(self, save):
        if self.has_image():
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
            self.image = None
            if save:
                self.save()

    def delete(self, *args, **kwargs):
        if self.has_image():
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super().delete()

    class Meta:
        verbose_name = "Person"
        verbose_name_plural = "Persons"

    def __str__(self) -> str:
        return "{}".format(
            self.contact,
        )


class AnimalType(models.Model):
    name = models.CharField(max_length=150)

    @property
    def all_animals(self):
        return self.linked_animals.all()

    @property
    def all_unlocked_animals(self):
        return self.linked_animals.filter(blocked=False)

    @property
    def all_not_adopted_animals(self):
        return self.linked_animals.filter(adopted=False)

    class Meta:
        verbose_name = "Animal type"
        verbose_name_plural = "Animals type"

    def __str__(self) -> str:
        return "{}".format(
            self.name,
        )


class Animal(models.Model):
    name = models.CharField(max_length=150)
    breed = models.CharField(max_length=150)
    age = models.IntegerField()
    sex = models.CharField(max_length=1)
    adopted = models.BooleanField(default=False)
    blocked = models.BooleanField(default=False)
    create_at = models.DateField(auto_now_add=True)
    owner = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        related_name="animals",
    )
    animal_type = models.ForeignKey(
        AnimalType,
        on_delete=models.CASCADE,
        related_name="linked_animals",
    )

    def block(self, person, reason):
        self.blocked = True
        reason = BlockedReason(
            person_requester=person,
            blocked_animal=self,
            reason=reason,
        )
        self.save()
        reason.save()

    @property
    def all_photos(self):
        return self.photos.all()

    @property
    def all_vaccines(self):
        return self.vaccines.all()

    @property
    def all_block_reasons(self):
        return self.blocks_received.all()

    @property
    def all_adoption_received(self):
        return self.adoption_requests.all()

    class Meta:
        verbose_name = "Animal"
        verbose_name_plural = "Animals"

    def __str__(self) -> str:
        return "{}".format(
            self.name,
        )


class AnimalPhoto(models.Model):
    photo = models.ImageField(
        upload_to=upload_image_formater,
        blank=True,
        null=True,
    )
    animal = models.ForeignKey(
        Animal,
        on_delete=models.CASCADE,
        related_name="photos",
    )

    def has_image(self):
        return self.photo != None and self.photo != ""

    def remove_image(self, save):
        if self.has_image():
            if os.path.isfile(self.photo.path):
                os.remove(self.photo.path)
            self.photo = None
            if save:
                self.save()

    def delete(self, *args, **kwargs):
        if os.path.isfile(self.photo.path):
            os.remove(self.photo.path)
        super().delete()

    class Meta:
        verbose_name = "Animal photo"
        verbose_name_plural = "Animal photos"

    def __str__(self) -> str:
        return "{} - {}".format(self.animal, self.photo)


class VaccineBook(models.Model):
    vaccine_name = models.CharField(max_length=150)
    date = models.DateField(auto_now_add=True)
    animal = models.ForeignKey(
        Animal,
        on_delete=models.CASCADE,
        related_name="vaccines",
    )

    class Meta:
        verbose_name = "Vaccine book"
        verbose_name_plural = "Vaccines book"

    def __str__(self) -> str:
        return "{} - {}".format(
            self.vaccine_name,
            self.animal,
        )


class BlockedReason(models.Model):
    create_at = models.DateField(auto_now_add=True)
    reason = models.TextField(max_length=500)
    person_requester = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        related_name="blocks_sent",
    )
    blocked_animal = models.ForeignKey(
        Animal,
        on_delete=models.CASCADE,
        related_name="blocks_received",
    )

    class Meta:
        verbose_name = "Block reason"
        verbose_name_plural = "Block reasons"

    def __str__(self) -> str:
        return "{} - {}".format(
            self.person_requester,
            self.blocked_animal,
        )


class AdoptionRequest(models.Model):
    create_at = models.DateField(auto_now_add=True)
    is_acepted = models.BooleanField(null=True, blank=True)
    requester = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        related_name="my_adoption_requests",
    )
    animal = models.ForeignKey(
        Animal,
        on_delete=models.CASCADE,
        related_name="adoption_requests",
    )

    def accept(self):
        self.animal.adopted = True
        self.is_acepted = True
        self.animal.save()
        self.save()

    def reject(self):
        self.is_acepted = False
        self.save()

    class Meta:
        verbose_name = "Adoption request"
        verbose_name_plural = "Adoption requests"

    def __str__(self) -> str:
        return "{} - {}".format(self.animal, self.requester)
