from apps.core.models import AnimalType


def animal_is_valid_or_errors(data):
    errors = []

    if "name" not in data:
        errors.append("O nome é requirido")
    elif len(data["name"]) < 3:
        errors.append("O nome deve conter pelo menos 3 caracteres")
    elif len(data["name"]) > 150:
        errors.append("O nome pode conter no máximo 150 caracteres")

    if "breed" not in data:
        errors.append("A raça é requirida")
    elif len(data["breed"]) < 3:
        errors.append("A raça deve conter pelo menos 3 caracteres")
    elif len(data["breed"]) > 150:
        errors.append("A raça pode conter no máximo 150 caracteres")

    if "age" not in data:
        errors.append("Informe a idade do animal")
    elif data["age"] < 0:
        errors.append("A idade não pode ser negativa")

    if "sex" not in data:
        errors.append("Informe o sexo do animal")
    elif data["sex"] != "M" and data["sex"] != "F":
        errors.append("O sexo do animal deve ser M o F")

    if "animal_type" not in data:
        errors.append("Qual é o tipo do animal")
    elif not animal_type_exists(data["animal_type"]):
        errors.append("O tipo de animal informado não existe")
    return errors


def animal_type_exists(id):
    return len(AnimalType.objects.filter(id=id)) > 0
