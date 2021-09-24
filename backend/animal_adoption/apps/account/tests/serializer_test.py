from django.test import TestCase
from django.contrib.auth.models import User
from apps.core.models import City, Person, State
from apps.account.serializers.user_serializers import (
    CreatePersonSerializer,
    UpdatePersonSerializer,
    UserSerializer,
)


class UserSerializerTestCase(TestCase):
    def set_persons(self):
        state = State.objects.create(name="Piaui")
        city = City.objects.create(name="Teresina", state=state)
        user = User.objects.create(
            username="person", first_name="Person", password="person"
        )
        Person.objects.create(contact="12345678", user=user, city=city)

    def setUp(self) -> None:
        self.set_persons()

    def test_user_serializer(self):
        person = Person.objects.get(pk=1)
        serializer = UserSerializer(person)
        self.assertEqual(
            str(serializer.data),
            "{'id': 1, 'image': None, 'name': 'Person', 'username': 'person', 'contact': '12345678', 'latitude': '', 'longitude': '', 'is_moderator': False, 'city': OrderedDict([('id', 1), ('name', 'Teresina'), ('state', 'Piaui')])}",
        )

    def test_should_be_city_error(self):
        user = User.objects.create(
            username="person3", password="senha123", first_name="person3"
        )
        person_obj = {
            "name": "Person2",
            "contact": "12345678",
            "city": 10,
            "user": user.id,
        }
        create_serializer = CreatePersonSerializer(data=person_obj)
        self.assertEqual(create_serializer.is_valid(), False)
        print(create_serializer.errors)

    def test_create_person_serializer(self):
        user = User.objects.create(
            username="person2", password="senha123", first_name="person2"
        )
        person_obj = {"contact": "12345678", "city": 1, "user": user.id}
        create_serializer = CreatePersonSerializer(data=person_obj)
        self.assertEqual(create_serializer.is_valid(), True)
        create_serializer.save()
        self.assertEqual(create_serializer.data["city"], 1)

    def test_update_person_serializer(self):
        person = Person.objects.get(pk=1)
        person_obj = {
            "contact": "12345678",
            "latitude": "321564159",
            "longitude": "648932159",
            "city": 1,
        }
        update_serializer = UpdatePersonSerializer(person, data=person_obj)
        self.assertEqual(update_serializer.is_valid(), True)
        update_serializer.save()
        self.assertEqual(update_serializer.data["latitude"], "321564159")
        self.assertEqual(update_serializer.data["longitude"], "648932159")
        self.assertEqual(update_serializer.data["city"], 1)
