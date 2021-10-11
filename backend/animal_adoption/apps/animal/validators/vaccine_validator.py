from apps.core.models import Animal
import datetime


def vaccine_is_valid_or_errors(data, owner):
    errors = []
    if "vaccine_name" not in data:
        errors.append("O nome da vacina é requerido")
    elif len(data["vaccine_name"]) > 150:
        errors.append("O nome pode conter no máximo 150 caracteres")

    if "date" in data:
        if not date_is_valid(data["date"]):
            errors.append("A data informada não é válida")

    if "animal" not in data:
        errors.append("Informe em qual animal a vacina será registrada")
    elif not animal_exists(data["animal"], owner):
        errors.append("O animal informado não foi localizado entre os seus registrados")

    return errors


def animal_exists(pk, owner):
    results = Animal.objects.filter(pk=pk)
    if len(results) == 0:
        return False
    elif results[0].owner != owner:
        return False
    return True


def date_is_valid(date):
    try:
        d = datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
        return True
    except ValueError:
        return False
