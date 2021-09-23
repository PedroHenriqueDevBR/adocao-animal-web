from apps.core.migrations import State, City


def state_is_valid_or_errors(data):
    errors = []
    if not "name" in data:
        errors.append("O nome do estado é obrigatório")
    else:
        if len(data["name"]) < 3:
            errors.append("O nome deve conter 3 caracteres ou mais")
        elif state_already_registered(data["name"]):
            errors.append(f"Estado (${data['name']}) já registrado")
    return errors


def city_is_valid_or_errors(data):
    errors = []
    if not "name" in data:
        errors.append("O nome da cidade é obrigatório")
    elif len(data["name"]) < 3:
        errors.append("O nome deve conter 3 caracteres ou mais")
    elif city_already_registered(data["name"]):
        errors.append(f"Cidade (${data['name']}) já registrada")

    if not "state" in data:
        errors.append("O estado não foi informado")
    elif not state_exists(data["state"]):
        errors.append("O estado não existe no banco de dados")
    return errors


def state_already_registered(name):
    return State.objects.filter(name=name) > 0


def state_exists(id):
    return State.objects.filter(id=id) > 0


def city_already_registered(name):
    return City.objects.filter(name=name) > 0
