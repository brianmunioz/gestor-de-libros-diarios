const validacionDePassword = (texto) => {
    let respuesta;
    const existeEspacio = Boolean(texto.match(/\s/));
    const esMayuscula = Boolean(texto.match(/[A-Z]/))
    const esMinuscula = Boolean(texto.match(/[a-z]/));
    const esNumero = Boolean(texto.match(/[0-9]/));
    const esCaracterEspecial = Boolean(texto.match(/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?¿´¡!#$%&°|`^'¬_]/));
    if (texto.trim() === '') {
        respuesta = {
            esValido: false,
            error: 'La contraseña no puede estar vacía.'
        }
        return respuesta;
    } else if (existeEspacio) {
        respuesta = {
            esValido: false,
            error: 'Tú contraseña no puede contener espacios.'
        }
        return respuesta;
    } else if (!esMayuscula) {
        respuesta = {
            esValido: false,
            error: 'Tú contraseña debe contener al menos una letra mayúscula.'
        }
        return respuesta;
    }
    else if (!esMinuscula) {
        respuesta = {
            esValido: false,
            error: 'Tú contraseña debe contener al menos una letra minuscula.'
        }
        return respuesta;
    }
    else if (!esNumero) {
        respuesta = {
            esValido: false,
            error: 'Tú contraseña debe contener al menos un número.'
        }
        return respuesta;
    }
    else if (!esCaracterEspecial) {
        respuesta = {
            esValido: false,
            error: 'Tú contraseña debe contener al menos un carácter especial.'
        }
        return respuesta;
    }
    else if (texto.length < 10) {
        respuesta = {
            esValido: false,
            error: 'Tú contraseña debe contener al menos 10 carácteres'
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
export default validacionDePassword;