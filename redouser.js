/*** Archivos ***/
const carpetas    = require('./Utilerias/Archivos/carpetas')
const { leerCarpetaFiltrada } = require('./Utilerias/OperadoresArchivos/readDirOnlyFile')

/*** Operadores de archivos ***/
const pcrArchivos = require('./Utilerias/OperadoresArchivos/procesadorArchivos')
const recodificar = require('./Utilerias/Codificacion/contenidoRecodificado')

/*** Operadores de cadena ***/
const { unirCamposConsecutivosComponente } = require('./Utilerias/OperarCadenas/unirConsecutivoPorComponente')

/*** Uso ***/
leerCarpetaFiltrada(carpetas.carpetaTesting,['.txt','.vis','.frm','.esp','.tbl','.rep','.dlg'])
    .then( archivos => {

        for (archivo in archivos) {

            pcrArchivos.crearArchivo(
                archivos[archivo],
                unirCamposConsecutivosComponente(recodificar.extraerContenidoRecodificado(
                    archivos[archivo])
                )
            )
        }
    })
    .catch(e => console.error(e))