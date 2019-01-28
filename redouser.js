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
            //console.log(archivos[archivo])
            let contenidoArchivo =  recodificar.extraerContenidoRecodificado(
                archivos[archivo])

            // contenidoArchivo = contenidoArchivo.replace(/\\n/g, '\n')
            // contenidoArchivo = contenidoArchivo.replace(/\\/g, '')
            //pcrArchivos.crearArchivo('Testing/ContenidoArchivo.txt', contenidoArchivo)
            //console.log(contenidoArchivo)
            let contenidoModificado = contenidoArchivo + '\n['
            contenidoModificado = regEx.jsonReplace.clsComentariosIntls(contenidoModificado)

            let componentesArchivo = contenidoModificado.match(
                regEx.expresiones.componentesIntls
            )
            // let camposOrdenados = []
            //let cont = 0
            for (componente in componentesArchivo) {
                // console.log(componente,componentesArchivo[componente])
                // pcrArchivos.crearArchivo('Testing/Componente-' + cont + '.txt', componentesArchivo[componente])
                // console.log(componente,'----------------------\n', componentesArchivo[componente])
                // console.log('**********************************\n',regEx.expresiones.campoConsecutivo)
                if (regEx.expresiones.campoConsecutivoIntls.test(componentesArchivo[componente])) {
                    //pcrArchivos.crearArchivo('Testing/Componente-' + cont + '.txt', componentesArchivo[componente])
                    //console.log(componentesArchivo[componente])
                    let camposUnidosComponente = unir.camposComponente(
                        componentesArchivo[componente]
                    )
                    // console.log(componente, camposUnidosComponente)

                    contenidoArchivo = remplazar.remplazarContenido(contenidoArchivo,
                        componentesArchivo[componente], camposUnidosComponente
                    )
                }
                // cont++
            }
            
            // pcrArchivos.crearArchivo('Testing/ComponentesJoin.txt', componentesArchivo.join('\n'))
            contenidoArchivo = contenidoArchivo.replace(/^\[$/m, '')

            contenidoArchivo = regEx.jsonReplace.clsSaltoLineaVacio(contenidoArchivo)
            contenidoArchivo = regEx.jsonReplace.addEspacioCmp(contenidoArchivo)

            pcrArchivos.crearArchivo(carpetas.carpetaTesting +
              regEx.jsonReplace.clsRuta(archivos[archivo]), contenidoArchivo)
        }
    })
    .catch(e => console.error(e))