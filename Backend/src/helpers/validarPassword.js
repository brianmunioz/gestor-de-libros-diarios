module.exports = (password) => {
    let respuesta;
    const contieneEspacio = Boolean(password.match(/\s/));
    const EsMayuscula = Boolean(password.match(/[A-Z]/))
    const esMinuscula = Boolean(password.match(/[a-z]/));
    const esNumerico = Boolean(password.match(/[0-9]/));
    const contieneCaracteresEspeciales = Boolean(password.match(/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?¿´¡!#$%&°|`^'¬_]/));
    if (password.trim() === '') {
        respuesta = {
            esValido: false,
            error: 'Es obligatorio completar el campo contraseña.'
        }
        return respuesta;
    } else if (contieneEspacio) {
        respuesta = {
            esValido: false,
            error: 'No se admiten los espacios en las contraseñas.'
        }
        return respuesta;
    } else if (!EsMayuscula) {
        respuesta = {
            esValido: false,
            error: 'La contraseña debe tener almenos una letra Mayúscula.'
        }
        return respuesta;
    }
    else if (!esMinuscula) {
        respuesta = {
            esValido: false,
            error: 'La contraseña debe tener al menos una letra minuscula.'
        }
        return respuesta;
    }
    else if (!esNumerico) {
        respuesta = {
            esValido: false,
            error: 'La contraseña debe tener al menos un número.'
        }
        return respuesta;
    }
    else if (!contieneCaracteresEspeciales) {
        respuesta = {
            esValido: false,
            error: 'La contraseña debe tener al menos un carácter especial.'
        }
        return respuesta;
    }
    else if (password.length < 10) {
        respuesta = {
            esValido: false,
            error: 'La contraseña debe tener al menos 10 caracteres'
        }
        return respuesta;
    }
    else {
        respuesta = {
            esValido: true
        }
        return respuesta;
    }

}
