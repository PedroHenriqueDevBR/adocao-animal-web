from django.contrib.auth.models import User
from apps.account.validators.user_validators import person_register_is_valid_or_errors
from django.test import TestCase


class ValidatorTestCase(TestCase):
    def test_person_validator_should_errrors_caused_no_data(self):
        person = {}
        self.assertEqual(len(person_register_is_valid_or_errors(person)), 4)

    def test_person_validator_errrors(self):
        person = {
            "name": "Pe",
            "username": "Pers",
            "password": "passw12",
            "contact": "1234567",
        }
        self.assertEqual(len(person_register_is_valid_or_errors(person)), 4)

    def test_person_validator_should_be_valid(self):
        person = {
            "name": "Per",
            "username": "Perso",
            "password": "passw123",
            "contact": "123456789",
        }
        self.assertEqual(len(person_register_is_valid_or_errors(person)), 0)

    def test_username_in_use_error(self):
        User.objects.create(first_name="person", username="person", password="passw123")
        person = {
            "name": "Per",
            "username": "person",
            "password": "passw123",
            "contact": "123456789",
        }
        self.assertEqual(len(person_register_is_valid_or_errors(person)), 1)
