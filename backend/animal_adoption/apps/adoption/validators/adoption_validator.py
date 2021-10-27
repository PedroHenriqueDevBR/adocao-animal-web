from apps.core.models import AdoptionRequest, Animal


def adoption_register_is_valid_or_errors(data, requester):
    errors = []

    if not "animal" in data:
        errors.append("Animal não informado")
    elif not animal_exists(data["animal"]):
        errors.append("O animal informado não foi localizado no banco de dados")
    else:
        if requester_is_animal_owner(requester, data["animal"]):
            errors.append("Você não pode solicitar adoção para o seu próprio animal")
        elif request_animal_exists(requester, data["animal"]):
            errors.append("Você já solicitou a adoção deste animal")

    return errors


def request_animal_exists(requester, animal_pk):
    animal = Animal.objects.get(pk=animal_pk)
    return len(AdoptionRequest.objects.filter(animal=animal, requester=requester)) > 0


def requester_is_animal_owner(requester, animal_pk):
    animal = Animal.objects.get(pk=animal_pk)
    return animal.owner == requester


def animal_exists(animal_pk):
    return len(Animal.objects.filter(pk=animal_pk)) > 0
