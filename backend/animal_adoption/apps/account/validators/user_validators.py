from apps.core.models import City
from django.contrib.auth.models import User


def person_register_is_valid_or_errors(data):
    errors = []
    if not "name" in data:
        errors.append("Nome é obrigatório")
    else:
        if len(data["name"]) < 3:
            errors.append("Nome deve conter 3 caracteres")

    if not "username" in data:
        errors.append("Username é obrigatório")
    else:
        if len(data["username"]) < 5:
            errors.append("Username deve conter 5 caracteres")
        elif username_in_use(data["username"]):
            errors.append("Username já registrado")

    if not "password" in data:
        errors.append("Password é obrigatório")
    else:
        if len(data["password"]) < 8:
            errors.append("Password deve conter 8 caracteres")

    if not "contact" in data:
        errors.append("Contato é obrigatório")
    else:
        if len(data["contact"]) < 8:
            errors.append("O contato não é válido")

    if not "city" in data:
        errors.append("Cidade é obrigatória")
    elif not city_exists(data["city"]):
        errors.append("A cidade informada não está registrada no nosso banco de dados")

    return errors


def person_update_is_valid_or_errors(data):
    errors = []
    if "name" in data:
        if len(data["name"]) < 3:
            errors.append("Nome deve conter pelo menos 3 caracteres")

    if "password" in data:
        if len(data["password"]) < 8:
            errors.append("Senha deve conter pelo menos 8 caracteres")

    if "contact" in data:
        if len(data["contact"]) < 8:
            errors.append("O contato não é válido")

    if "city" in data:
        if not city_exists(data["city"]):
            errors.append("A cidade informada não está registrada no nosso banco de dados")

    return errors


def image_data_is_valid_or_errors(data):
    errors = []
    if not "image" in data:
        errors.append("A imagem é obrigatória")
    return errors


def city_exists(pk):
    return len(City.objects.filter(pk=pk)) > 0


def username_in_use(username):
    return len(User.objects.filter(username=username)) > 0
