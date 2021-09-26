def animal_type_is_valid_or_errors(data):
    errors = []
    if 'name' not in data:
        errors.append('O nome do tipo é obrigatório')
    elif len(data['name']) > 150:
        errors.append('O nome pode conter no máximo 150 caracteres')
    return errors
