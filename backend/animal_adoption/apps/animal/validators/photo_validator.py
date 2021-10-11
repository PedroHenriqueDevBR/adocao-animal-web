from apps.core.models import Animal


def photo_is_valid_or_errors(data, owner):
    errors = []
    if "photo" not in data:
        errors.append("A imagem é requerida")

    if "animal" not in data:
        errors.append("Informe para qual animal a foto será adicionada")
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
