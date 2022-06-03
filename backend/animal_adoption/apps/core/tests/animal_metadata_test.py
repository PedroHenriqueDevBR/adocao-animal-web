from django.contrib.auth.models import User
from django.test import TestCase
from datetime import datetime
from apps.core.models import (
    AdoptionRequest,
    AnimalType,
    Animal,
    City,
    State,
    VaccineBook,
    Person,
)


class VaccineTestCase(TestCase):
    def create_animal(self):
        person = self.create_persons(1)
        animal_type = AnimalType.objects.create(name="Dog")
        return Animal.objects.create(
            name="Dog 01",
            breed="Vira Latinha",
            age=2,
            sex="M",
            owner=person,
            animal_type=animal_type,
        )

    def create_persons(self, id):
        state = State.objects.create(name="Piaui")
        city = City.objects.create(name="Teresina", state=state)
        user = User.objects.create(
            username=f"person{id}", first_name=f"Person{id}", password="person"
        )
        return Person.objects.create(contact="12345678", user=user, city=city)

    def setUp(self) -> None:
        person_requester = self.create_persons(2)
        animal = self.create_animal()
        VaccineBook.objects.create(
            vaccine_name="Vaccine 01", date=datetime.now(), animal=animal
        )
        VaccineBook.objects.create(
            vaccine_name="Vaccine 02", date=datetime.now(), animal=animal
        )
        AdoptionRequest.objects.create(requester=person_requester, animal=animal)

    def test_animal_data(self):
        animal = Animal.objects.get(pk=1)
        self.assertEqual(len(animal.all_vaccines), 2)
        self.assertEqual(animal.animal_type.name, "Dog")
        self.assertEqual(len(animal.all_adoption_received), 1)

    def test_block_animal(self):
        person = self.create_persons(3)
        animal = Animal.objects.get(pk=1)
        animal.block(person=person, reason="Okay")
        self.assertEqual(animal.blocked, True)
        self.assertEqual(len(animal.all_block_reasons), 1)

    def test_adoption_animal(self):
        animal = Animal.objects.get(pk=1)
        adoption_request = animal.all_adoption_received[0]
        adoption_request.accept()
        self.assertEqual(adoption_request.is_acepted, True)
        self.assertEqual(animal.adopted, True)
