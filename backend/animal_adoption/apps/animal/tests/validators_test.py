from django.test import TestCase
from apps.core.models import AnimalType
from apps.animal.validators.animal_validator import animal_is_valid_or_errors
from apps.animal.validators.animal_type_validator import animal_type_is_valid_or_errors


class AnimalTypeValidatorTestCase(TestCase):
    def test_animal_type_validator_error_no_data(self):
        animal_type_obj = {}
        errors = animal_type_is_valid_or_errors(animal_type_obj)
        self.assertGreater(len(errors), 0)
        self.assertEqual("O nome do tipo é obrigatório" in errors, True)

    def test_animal_type_name_limit_character(self):
        animal_type_obj = {
            "name": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
        errors = animal_type_is_valid_or_errors(animal_type_obj)
        self.assertGreater(len(errors), 0)
        self.assertEqual("O nome pode conter no máximo 150 caracteres" in errors, True)

    def test_animal_type_data_is_valid(self):
        animal_type_obj = {"name": "Dog"}
        errors = animal_type_is_valid_or_errors(animal_type_obj)
        self.assertEqual(len(errors), 0)


class AnimalDataValidatorTestCase(TestCase):
    def setUp(self) -> None:
        AnimalType.objects.create(name="Dog")

    def test_animal_validator_error_no_data(self):
        animal_obj = {}
        errors = animal_is_valid_or_errors(animal_obj)
        self.assertEqual(len(errors), 5)
        self.assertEqual("O nome é requirido" in errors, True)
        self.assertEqual("A raça é requirida" in errors, True)
        self.assertEqual("Informe a idade do animal" in errors, True)
        self.assertEqual("Informe o sexo do animal" in errors, True)
        self.assertEqual("Qual é o tipo do animal" in errors, True)

    def test_animal_validator_error_min_data_required(self):
        animal_obj = {
            "name": "Ab",
            "breed": "Cd",
            "age": -1,
            "sex": "No",
            "animal_type": 5,
        }
        errors = animal_is_valid_or_errors(animal_obj)
        self.assertEqual(len(errors), 5)
        self.assertEqual("O nome deve conter pelo menos 3 caracteres" in errors, True)
        self.assertEqual("A raça deve conter pelo menos 3 caracteres" in errors, True)
        self.assertEqual("A idade não pode ser negativa" in errors, True)
        self.assertEqual("O sexo do animal deve ser M o F" in errors, True)
        self.assertEqual("O tipo de animal informado não existe" in errors, True)

    def test_animal_validator_error_max_data_required(self):
        animal_obj = {
            "name": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "breed": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "age": 1,
            "sex": "M",
            "animal_type": 1,
        }
        errors = animal_is_valid_or_errors(animal_obj)
        self.assertEqual(len(errors), 2)
        self.assertEqual("O nome pode conter no máximo 150 caracteres" in errors, True)
        self.assertEqual("A raça pode conter no máximo 150 caracteres" in errors, True)

    def test_animal_validator_is_valid(self):
        animal_obj = {
            "name": "Bob",
            "breed": "Unknown",
            "age": 0,
            "sex": "M",
            "animal_type": 1,
        }
        errors = animal_is_valid_or_errors(animal_obj)
        self.assertEqual(len(errors), 0)
