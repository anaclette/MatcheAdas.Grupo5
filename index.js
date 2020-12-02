const grillaHTML = document.querySelector("#grilla")
const dialogoNuevoJuego = document.querySelector(".dialogo.nuevo-juego")
const botonNuevoJuego = document.querySelector("#boton-nuevo-juego")
const botonReiniciarJuego = document.querySelector("#boton-reiniciar-juego")
const botonBuscarMatch = document.querySelector("#boton-buscar-match")
const botonModoFacil = document.querySelector("#boton-modo-facil")
const botonModoNormal = document.querySelector("#boton-modo-normal")
const botonModoDificil = document.querySelector("#boton-modo-dificil")
const mosaicos = document.getElementsByClassName('mosaico')
const items = ['🍉', '🥝', '🍌', '🍇', '🍋', '🥥']

//Comportamiento general de modales
const abrirModal = (elemento) => {
    elemento.classList.remove('hiden')
    overlay.classList.remove('hidden')
}

const cerrarModal = (elemento) => {
    elemento.classList.add('hiden')
    overlay.classList.add('hiden')

}


//Pedir al usuario que elija la dificultad de la partida
let nivelDificultad = '' //Almaceno niveles de dificultad para reutilizar luego

botonModoFacil.onclick = () => {
    grillaFacil()
    nivelDificultad = 'facil' 
}

botonModoNormal.onclick = () => {
    grillaNormal()
    nivelDificultad = 'normal'
}

botonModoDificil.onclick = () => {
    grillaDificil()
    nivelDificultad = 'dificil'
}

// Crear una grilla en JS y en HTML con items aleatorios 
// Si hay matches, volver a generar una grilla

const grillaFacil = () => {
    do {
    vaciarGrillaHTML()
    generarGrilla(9, 9)
    generarGrillaEnHTML(9, 9, items)
    } while(hayMatchInicial())
}

const grillaNormal = () => {
    do {
    vaciarGrillaHTML()
    generarGrilla(8, 8)
    generarGrillaEnHTML(8, 8, items)
    } while(hayMatchInicial())
}

const grillaDificil = () => {
    do {
    vaciarGrillaHTML()
    generarGrilla(7, 7)
    generarGrillaEnHTML(7, 7, items)
    } while(hayMatchInicial())
}


const obtenerNumeroAlAzar = items => {
    return Math.floor((Math.random() * items.length))
}

const obtenerItemAlAzar = items => {
    return items[obtenerNumeroAlAzar(items)]
}

let grilla = []
const generarGrilla = (filas, columnas) => {

    grilla = []
    for (let i = 0; i < filas; i++) {
        grilla[i] = []
        for (let j = 0; j < columnas; j++) {
            grilla[i][j] = obtenerItemAlAzar(items)
        }
    }
    return grilla
}

const generarMosaicos = (x, y, array) => {
    const tamanio = 50

    const mosaico = document.createElement('div')
    
    mosaico.classList.add('mosaico')
    mosaico.dataset.x = x
    mosaico.dataset.y = y
    mosaico.innerHTML = array[x][y]
    mosaico.style.top = `${x * tamanio}px`
    mosaico.style.left = `${y * tamanio}px`
    return mosaico
}

const generarGrillaEnHTML = (filas, columnas, items) => {
    const anchoDeGrilla = 50 * columnas
    grillaHTML.style.width = `${anchoDeGrilla}px`
    const listadeItems = grilla;
    for (let i = 0; i < listadeItems.length; i++) {
        for (let j = 0; j < listadeItems[i].length; j++) {
            grillaHTML.appendChild(generarMosaicos(i, j, listadeItems))
        }
    }
}

generarGrilla()
generarGrillaEnHTML()

// Chequeamos si hay matches al inicio
const hayMatchVertical = () => {
    for (let i = 0; i < grilla.length; i++) {
        for (let j = 0; j < grilla[i].length; j++) {
            if (grilla[i + 1] && grilla[i + 2] && grilla[i][j] === grilla[i + 1][j] && grilla[i][j] === grilla[i + 2][j]) {
                return true
            }
        }
    }
    return false
}

const hayMatchHorizontal = () => {
    for (let i = 0; i < grilla.length; i++) {
        for (let j = 0; j < grilla[i].length; j++) {
            if (grilla[i][j] === grilla[i][j + 1] && grilla[i][j] === grilla[i][j + 2]) {
                return true
            }
        }
    }
    return false
}

const hayMatchInicial = () => {
    if (hayMatchVertical() || hayMatchHorizontal()) {
        return true
    }
    else {
        return false
    }
}


// //--------------FALTA HACER----------------
// //Opciones nuevo juego

botonNuevoJuego.onclick = () => {
    console.log(dialogoNuevoJuego)
}
// //-----------------------------------------
const vaciarGrillaHTML = () => {
    grillaHTML.textContent = ''
}

botonReiniciarJuego.onclick = () => {
    //grillaHTML.textContent = ''
    revisarDificultadElegida()
}

const revisarDificultadElegida = () => {
    if (nivelDificultad === 'facil') {
        grillaFacil()
    }
    else if (nivelDificultad === 'normal') {
        grillaNormal()
    }
    else if (nivelDificultad === 'dificil') {
        grillaDificil()
    }
}




// Si no hay bloques, 
// el usuario hace click en un mosaico
// el usuario hace click en otro mosaico
// chequeamos si moviendo los mosaicos de lugar hay matches
// si no hay, volvemos elementos a la posicion original
// si hay, mantenemos los elementos en la nueva posicion
// 

//Seleccionar mosaico al hacer click en el
let primerMosaicoSeleccionado= ''
for (let i = 0; i < mosaicos.length; i++) {
    primerMosaicoSeleccionado+= i
    
    console.log("soy un mosaico")
    mosaico.onclick = () => {
     seleccionarMosaico()
    }
}

const seleccionarMosaico=()=>{
    mosaico.classList.add('seleccionado')
    console.log("pepo")
}

// desaparecen las frutas
// elimino los elementos tanto en HTML como en JS 

// primera version: rellenar con elementos al azar

// segunda version: hacer que los elementos "caigan"
// mientras haya items con posiciones vacias por debajo, 
// obtener la cantidad de posciones vacias que tiene debajo
// bajar el item esas pisiciones
// rellenar posiciones restantes (las de mas arriba) con elementos al azar
