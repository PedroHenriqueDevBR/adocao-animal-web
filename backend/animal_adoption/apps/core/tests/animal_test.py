from django.contrib.auth.models import User
from django.test import TestCase
from apps.core.models import AnimalType, Animal, City, Person, State


class AnimalTypeTestCase(TestCase):
    def create_owner(self, id) -> Person:
        user = User.objects.create(
            first_name="person {}".format(id),
            username="person{}".format(id),
            password="1234",
        )
        state = State.objects.create(name="Piaui")
        city = City.objects.create(name="Teresina", state=state)
        return Person.objects.create(contact="12345678", user=user, city=city)

    def set_types(self):
        AnimalType.objects.create(name="Cachorro")
        AnimalType.objects.create(name="Gato")
        AnimalType.objects.create(name="Porquinho da india")

    def set_animals(self):
        owner_o1 = self.create_owner(1)

        dog_type = AnimalType.objects.get(name="Cachorro")
        cat_type = AnimalType.objects.get(name="Gato")
        pork_type = AnimalType.objects.get(name="Porquinho da india")

        Animal.objects.create(
            name="Dog 01",
            breed="Vira Latinha",
            age=2,
            sex="M",
            owner=owner_o1,
            type=dog_type,
        )
        Animal.objects.create(
            name="Cat 01",
            breed="Vira Latinha",
            age=1,
            sex="M",
            owner=owner_o1,
            type=cat_type,
        )
        Animal.objects.create(
            name="Porquinho 01",
            breed="I dont now",
            age=1,
            sex="M",
            owner=owner_o1,
            type=pork_type,
        )

    def setUp(self) -> None:
        self.set_types()
        self.set_animals()

    def test_types_properties(self):
        dog_type = AnimalType.objects.get(name="Cachorro")
        cat_type = AnimalType.objects.get(name="Gato")
        pork_type = AnimalType.objects.get(name="Porquinho da india")

        self.assertEqual(len(dog_type.all_animals), 1)
        self.assertEqual(len(cat_type.all_animals), 1)
        self.assertEqual(len(pork_type.all_animals), 1)

    def test_all_aninals_from_city(self):
        city = City.objects.get(pk=1)
        self.assertEqual(len(city.all_not_adopted_animals), 3)
        self.assertEqual(len(city.all_persons), 1)
