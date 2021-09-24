from django.test import TestCase
from apps.core.models import City, State
from apps.location.validators.location_validators import (
    city_is_valid_or_errors,
    state_is_valid_or_errors,
)


class CityValidatorTestCase(TestCase):
    def test_city_should_be_errors(self):
        city = {}
        errors = city_is_valid_or_errors(city)
        self.assertGreater(len(errors), 0)

    def test_city_should_be_error_name_already_registered(self):
        state = State.objects.create(name="Piaui")
        City.objects.create(name="Teresina", state=state)
        city_obj = {"name": "Teresina"}
        errors = city_is_valid_or_errors(city_obj)
        self.assertGreater(len(errors), 0)
        self.assertEqual(errors[0], "Cidade Teresina já registrada")

    def test_city_data_should_be_error_state_not_found(self):
        city_obj = {"name": "Campo Maior"}
        errors = city_is_valid_or_errors(city_obj)
        self.assertGreater(len(errors), 0)
        self.assertEqual(errors[0], "O estado não foi informado")

    def test_city_data_should_be_valid(self):
        State.objects.create(name="Piaui")
        city_obj = {"name": "Campo Maior", "state": 1}
        errors = city_is_valid_or_errors(city_obj)
        self.assertEqual(len(errors), 0)


class StateValidatorTestCase(TestCase):
    def test_state_should_be_errors(self):
        state_obj = {}
        errors = state_is_valid_or_errors(state_obj)
        self.assertGreater(len(errors), 0)

    def test_state_should_be_error_name_already_registered(self):
        State.objects.create(name="Piaui")
        state_obj = {"name": "Piaui"}
        errors = state_is_valid_or_errors(state_obj)
        self.assertGreater(len(errors), 0)
        self.assertEqual(errors[0], "Estado Piaui já registrado")

    def test_state_data_should_be_valid(self):
        state_obj = {"name": "Maranhao"}
        errors = state_is_valid_or_errors(state_obj)
        self.assertEqual(len(errors), 0)
