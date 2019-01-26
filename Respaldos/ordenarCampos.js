/*** Archivos ***/
const arrCampos = require('../Archivos/arregloCamposIntelisis')

/*** Operadores de cadena ***/
const regEx = require('../RegEx/jsonRgx')

/***
 * Ordena los campos consecutivos de intelisis con el método Short()
 * @texto contenido donde se encuentran los campos desordenados
 * @contenidoCamposConSinDigito campos extraidos con y sin digito
 * @campoSinDigito extrae el campo sin digito
 * @campoConDigito extrae los campos sin digito
 ***/
function ordenar (texto, contenidoCamposConSinDigito, campoSinDigito, campoConDigito) {
    return texto.match(campoSinDigito).join('\n') + '\n' + 
            contenidoCamposConSinDigito.match(campoConDigito
            ).join('\n').split('\n').sort().join('\n')
}

/***
 * Función que crea expresiones que extraen el campo y contenido
 * @campo descripcion del campo a buscar
 ***/
const crearExpresionCampos = (arrCampos) => {
    let expresiones    = []
    for (key in arrCampos) {
        
        campoConDigito = regEx.crearRegEx.campoConDigito(arrCampos)
        campoSinDigito = regEx.crearRegEx.campoSinDigito(arrCampos)
        camposConSinDigito = regEx.crearRegEx.campoConSinDigito(arrCampos)
        
        expresiones.push(
            Object.assign({campoConDigito,campoSinDigito, camposConSinDigito})
        )
    }
    return expresiones
}

/***
 * Funcion que detecta campos consecutivos y los ordena
 * @contenidoArchivo texto del archivo
***/
exports.extraerOrdenarCampos = function (contenidoArchivo) {

    let campoConDigito    = []
    let campoSinDigito    = []
    let contenidoOrdenado = []

    let expresiones = crearExpresionCampos(arrCampos.arregloCampos)

    for(expresion in expresiones) {
    
        if (expresiones[expresion].campoConDigito.test(contenidoArchivo)) {

                let contenidoCamposConSinDigito = ''
                contenidoCamposConSinDigito = contenidoArchivo.match(expresiones[expresion].camposConSinDigito).join('\n')

                contenidoOrdenado.push(ordenar(contenidoArchivo, contenidoCamposConSinDigito, expresiones[expresion].campoSinDigito, expresiones[expresion].campoConDigito))
                campoConDigito.push(expresiones[expresion].campoConDigito)
                campoSinDigito.push(expresiones[expresion].campoSinDigito)
        }
    }
    return {
        campoConDigito: campoConDigito,
        campoSinDigito: campoSinDigito,
        contenidoOrdenado: contenidoOrdenado,
    }
}

