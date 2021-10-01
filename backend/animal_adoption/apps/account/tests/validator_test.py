from django.contrib.auth.models import User
from django.test import TestCase
from apps.core.models import City, State
from apps.account.validators.user_validators import (
    person_register_is_valid_or_errors,
    person_update_is_valid_or_errors,
)


class ValidatorTestCase(TestCase):
    def setUp(self) -> None:
        state = State.objects.create(name="Estado")
        City.objects.create(name="cidade", state=state)

    def test_person_validator_should_errrors_caused_no_data(self):
        person = {}
        self.assertEqual(len(person_register_is_valid_or_errors(person)), 5)

    def test_person_validator_errrors(self):
        person = {
            "name": "Pe",
            "username": "Pers",
            "password": "passw12",
            "contact": "1234567",
            "city": 2,
        }
        self.assertEqual(len(person_register_is_valid_or_errors(person)), 5)

    def test_person_validator_should_be_valid(self):
        person = {
            "name": "Per",
            "username": "Perso",
            "password": "passw123",
            "contact": "123456789",
            "city": 1,
        }
        self.assertEqual(len(person_register_is_valid_or_errors(person)), 0)

    def test_username_in_use_error(self):
        User.objects.create(first_name="person", username="person", password="passw123")
        person = {
            "name": "Per",
            "username": "person",
            "password": "passw123",
            "contact": "123456789",
            "city": 1,
        }
        self.assertEqual(len(person_register_is_valid_or_errors(person)), 1)


class UpdateValidatorTestCase(TestCase):
    def setUp(self) -> None:
        state = State.objects.create(name="Estado")
        City.objects.create(name="cidade", state=state)

    def test_update_validator_should_be_valid_with_no_data(self):
        person = {}
        self.assertEqual(len(person_update_is_valid_or_errors(person)), 0)

    def test_person_validator_errrors(self):
        person = {
            "name": "Pe",
            "password": "passw12",
            "contact": "1234567",
            "city": 10,
        }
        self.assertEqual(len(person_update_is_valid_or_errors(person)), 4)

    def test_person_validator_should_be_valid(self):
        person = {
            "name": "Per",
            "password": "passw123",
            "contact": "123456789",
            "city": 1,
        }
        self.assertEqual(len(person_update_is_valid_or_errors(person)), 0)

    def test_person_validator_should_be_valid_name_only(self):
        person = {
            "name": "Per",
        }
        self.assertEqual(len(person_update_is_valid_or_errors(person)), 0)

    def test_person_validator_should_be_valid_password_only(self):
        person = {
            "password": "passw123",
        }
        self.assertEqual(len(person_update_is_valid_or_errors(person)), 0)

    def test_person_validator_should_be_valid_contact_only(self):
        person = {
            "contact": "123456789",
        }
        self.assertEqual(len(person_update_is_valid_or_errors(person)), 0)

    def test_person_validator_should_be_valid_city_only(self):
        person = {
            "city": 1,
        }
        self.assertEqual(len(person_update_is_valid_or_errors(person)), 0)
