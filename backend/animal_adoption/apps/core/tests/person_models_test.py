from django.test import TestCase
from apps.core.models import State, City, Person
from django.contrib.auth.models import User


class StatePersonTestCase(TestCase):
    def set_locations(self):
        print("=" * 50)
        print("Setting locations")
        piaui = State.objects.create(name="Piaui")
        City.objects.create(name="Teresina", state=piaui)
        City.objects.create(name="Campo Maior", state=piaui)
        City.objects.create(name="Piripiri", state=piaui)
        City.objects.create(name="Nazaria", state=piaui)
        maranhao = State.objects.create(name="Maranhao")
        City.objects.create(name="Timon", state=maranhao)
        City.objects.create(name="Caxias", state=maranhao)
        City.objects.create(name="Sao Luis", state=maranhao)
        City.objects.create(name="Bacabal", state=maranhao)

    def set_persons(self):
        print("=" * 50)
        print("Setting Persons")
        city = City.objects.get(pk=1)
        user = User.objects.create(
            username="person", first_name="Person", password="person"
        )
        Person.objects.create(contact="12345678", user=user, city=city)

    def setUp(self) -> None:
        self.set_locations()
        self.set_persons()

    def test_state_is_created(self):
        piaui = State.objects.get(name="Piaui")
        maranhao = State.objects.get(name="Maranhao")
        self.assertEqual(len(piaui.cities.all()), 4)
        self.assertEqual(len(maranhao.cities.all()), 4)

    def test_person_data(self):
        person = Person.objects.get(pk=1)
        self.assertEqual(person.name, 'Person')
        self.assertEqual(person.username, 'person')
        self.assertEqual(person.contact, '12345678')
        self.assertEqual(person.city.name, 'Teresina')
        self.assertEqual(person.city.state.name, 'Piaui')
