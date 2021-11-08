def block_reason_is_valid_or_errors(data):
    errors = []
    if "reason" not in data:
        errors.append("Informe o motivo do bloqueio")
    elif len(data["reason"]) == 0:
        errors.append("Informe o motivo do bloqueio")

    return errors


def unlock_reason_is_valid_or_errors(animal, blocks):
    errors = []
    if animal.blocked == False:
        errors.append('Animal já encontra-se desbloqueado')
    elif len(blocks) > 0:
        errors.append('Animal bloqueado por moderador, entre em contato com a administração do sistema para desbloquar')

    return errors
