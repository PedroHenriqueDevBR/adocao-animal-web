from django.test import TestCase
from rest_framework import serializers
from apps.location.serializers.state_serializers import StateSerializer
from apps.core.models import City, State
from apps.location.serializers.city_serializers import (
    CitySerializer,
    CreateCitySerializer,
)


class StateSerializerTestCase(TestCase):
    def test_state_serializer_is_valid(self):
        state_obj = {"name": "Piaui"}
        serializer = StateSerializer(data=state_obj)
        self.assertEqual(serializer.is_valid(), True)
        serializer.save()
        self.assertEqual(serializer.data["id"], 1)

    def test_update_state(self):
        state = State.objects.create(name="Pia")
        state_obj = {"name": "Piaui"}
        serializer = StateSerializer(state, data=state_obj)
        self.assertEqual(serializer.is_valid(), True)


class CitySerializerTestCase(TestCase):
    def test_city_serializer_is_valid(self):
        State.objects.create(name="Piaui")
        city_obj = {"name": "Teresina", "state": 1}
        serializer = CreateCitySerializer(data=city_obj)
        self.assertEqual(serializer.is_valid(), True)
        serializer.save()
        self.assertEqual(serializer.data["id"], 1)

    def test_select_cities_with_state_name(self):
        state = State.objects.create(name="Piaui")
        City.objects.create(name="Teresina", state=state)
        serializer = CitySerializer(City.objects.all(), many=True)
        self.assertEqual(serializer.data[0]["state"], "Piaui")

    def test_update(self):
        maranhao = State.objects.create(name="Maranhao")
        piaui = State.objects.create(name="Piaui")
        city = City.objects.create(name="Teresin", state=maranhao)
        city_obj = {
            "name": "Teresina",
            "state": piaui.id
        }
        serializer = CreateCitySerializer(city, data=city_obj)
        self.assertEqual(serializer.is_valid(), True)
        serializer.save()
        self.assertEqual(serializer.data['name'], 'Teresina')
        self.assertEqual(serializer.data['state'], 2)
