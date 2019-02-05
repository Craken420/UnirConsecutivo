/*** Archivos ***/
const carpetas    = require('./Utilerias/Archivos/carpetas')
const leerCarpeta = require('./Utilerias/OperadoresArchivos/leerCarpeta')

/*** Operadores de archivos ***/
const pcrArchivos = require('./Utilerias/OperadoresArchivos/procesadorArchivos')
const recodificar = require('./Utilerias/Codificacion/contenidoRecodificado')

/*** Operadores de cadena ***/
const regEx       = require('./Utilerias/RegEx/jsonRgx')
const { unirCamposConsecutivosComponente } = require('./Utilerias/OperarCadenas/unirConsecutivoComponente')

/*** Uso ***/
leerCarpeta.obtenerArchivos(carpetas.archivos)
    .then( archivos => {

        for (archivo in archivos) {

            pcrArchivos.crearArchivo(
                carpetas.carpetaTesting + regEx.jsonReplace.clsRuta(archivos[archivo]),
                unirCamposConsecutivosComponente(
                    recodificar.extraerContenidoRecodificado(
                        archivos[archivo]
                    )
                )
            )
        }
    })
    .catch(e => console.error(e))