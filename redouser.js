/*** Archivos ***/
const carpetas    = require('./Utilerias/Archivos/carpetas')
const leerCarpeta = require('./Utilerias/OperadoresArchivos/leerCarpeta')

/*** Operadores de archivos ***/
const pcrArchivos =  require('./Utilerias/OperadoresArchivos/procesadorArchivos')
const recodificar = require('./Utilerias/Codificacion/contenidoRecodificado')

/*** Operadores de cadena ***/
const regEx       = require('./Utilerias/RegEx/jsonRgx')
const remplazar   = require('./Utilerias/OperarCadenas/remplazarContenido')
const unir        = require('./Utilerias/OperarCadenas/unirConsecutivoComponente')

/*** Uso ***/
leerCarpeta.obtenerArchivos(carpetas.archivos)
    .then(archivos => {

        for (archivo in archivos) {

            let contenidoArchivo =  recodificar.extraerContenidoRecodificado(
                archivos[archivo])

            let contenidoModificado = contenidoArchivo + '\n['
            contenidoModificado = regEx.jsonReplace.clsComentarios(contenidoModificado)

            let componentesArchivo = contenidoModificado.match(
                regEx.expresiones.componentesIntelisis
            )

            for (componente in componentesArchivo) {

                if (regEx.expresiones.campoConsecutivo.test(componentesArchivo[componente])) {

                    contenidoArchivo = remplazar.remplazarContenido(contenidoArchivo,
                        componentesArchivo[componente], 
                        unir.camposComponente (
                            componentesArchivo[componente]
                        )
                    )
                }
            }

            contenidoArchivo = contenidoArchivo.replace(/^\[$/m, '')

            contenidoArchivo = regEx.jsonReplace.clsSaltoLineaVacio(contenidoArchivo)
            contenidoArchivo = regEx.jsonReplace.addEspacioComponente(contenidoArchivo)

            pcrArchivos.crearArchivo(carpetas.carpetaTesting +
              regEx.jsonReplace.clsRuta(archivos[archivo]), contenidoArchivo)
        }
    })
    .catch(e => console.error(e))