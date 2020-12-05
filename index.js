const body = document.body
const grillaHTML = document.querySelector("#grilla")
const dialogoNuevoJuego = document.querySelector("#dialogo-nuevo-juego")
const botonesNuevoJuego = document.querySelectorAll("#boton-nuevo-juego")
const botonReiniciarJuego = document.querySelector("#boton-reiniciar-juego")
const botonBuscarMatch = document.querySelector("#boton-buscar-match")
const botonModoFacil = document.querySelector("#boton-modo-facil")
const botonModoNormal = document.querySelector("#boton-modo-normal")
const botonModoDificil = document.querySelector("#boton-modo-dificil")
const mosaicos = document.getElementsByClassName('mosaico')
const items = ['🐺', '🦊', '🦝 ', '🐻 ', '🐨 ', '🐦', '🍄', '🌲', '🍁',]
const tiempoRestanteHTML = document.querySelector("#tiempo-restante")
const overlay = document.querySelector("#overlay")
const dialogoJuegoTerminado = document.querySelector("#dialogo-juego-terminado")
const botonAyuda = document.querySelector("#boton-ayuda")
const botonIconoRestart = document.querySelector("#boton-restart")
const dialogoBienvenida = document.querySelector("#dialogo-bienvenida")
const dialogoReiniciarJuego = document.querySelector("#dialogo-reiniciar-juego")
const botonAJugar = document.querySelector("#boton-empezar-juego")
const ventanasDeDialogo = document.querySelectorAll(".dialogo")
const botonCancelar = document.querySelector("#boton-cancelar")


//Comportamiento general del overlay
const abrirModal = () => {
    overlay.classList.remove('hidden')
    //body.classList.add('no-scroll')
}

const cerrarModal = () => {
    overlay.classList.add('hidden')

    for (let dialogo of ventanasDeDialogo) {
        dialogo.classList.add('hidden')
    }
}

//Comportamiento general de modales y botones
window.onload = () => {
    dialogoBienvenida.classList.remove('hidden')
}

botonAyuda.onclick = () => {
    abrirModal()
    dialogoBienvenida.classList.remove('hidden')
}

botonIconoRestart.onclick = () => {
    abrirModal()
    dialogoReiniciarJuego.classList.remove('hidden')
}

botonAJugar.onclick = () => {
    botonAJugar.parentElement.parentElement.classList.add('hidden')
    dialogoNuevoJuego.classList.remove('hidden')
}

for (let boton of botonesNuevoJuego) {
    boton.onclick = () => {
        boton.parentElement.parentElement.classList.add('hidden')
        dialogoNuevoJuego.classList.remove('hidden')
    }
}



botonCancelar.onclick = () => {
    cerrarModal()
}

botonAJugar.onclick = () => {
    botonAJugar.parentElement.parentElement.classList.add('hidden')
    dialogoNuevoJuego.classList.remove('hidden')
}

for (let boton of botonesNuevoJuego) {
    boton.onclick = () => {
        boton.parentElement.parentElement.classList.add('hidden')
        dialogoNuevoJuego.classList.remove('hidden')
    }
}



botonCancelar.onclick = () => {
    cerrarModal()
}


//Pedir al usuario que elija la dificultad de la partida
let nivelDificultad = '' //Almaceno niveles de dificultad para reutilizar luego

botonModoFacil.onclick = () => {
    grillaFacil()
    
for (let mosaico of mosaicos) {
    mosaico.onclick = () => {
// PRIMER CLICK
        console.log(mosaico);
         clicks.push(mosaico)
          for (let mosaico2 of mosaicos) {
// SEGUNDO CLICK
             mosaico2.onclick = () => {
                 console.log(mosaico2);
             clicks.push(mosaico2);
             
      }
    }
}
}

    cuentaRegresiva()
    cerrarModal()
    nivelDificultad = 'facil'
}

botonModoNormal.onclick = () => {
    grillaNormal()
    cuentaRegresiva()
    cerrarModal()
    nivelDificultad = 'normal'
}

botonModoDificil.onclick = () => {
    grillaDificil()
    cuentaRegresiva()
    cerrarModal()
    nivelDificultad = 'dificil'
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

//Empezar cuenta regresiva al crear un juego nuevo --------FUNCIONA AL INICIO, TIENE BUG AL REINICIAR----
let tiempoRestante = 3

const cuentaRegresiva = () => {
    tiempoRestanteHTML.textContent = `0:${tiempoRestante}`
    
    if (tiempoRestante > 0) {
        tiempoRestante--
        setTimeout(cuentaRegresiva, 1000)
        }
    else {
        tiempoRestante = 3
        terminarJuego()
    }

}


botonReiniciarJuego.onclick = () => {
    console.log("Pepo")
    revisarDificultadElegida()
    //dialogoNuevoJuego.classList.remove('hidden')
    cuentaRegresiva()
    cerrarModal()

}

const terminarJuego = () => {
    dialogoNuevoJuego.classList.add('hidden')
    abrirModal()
    dialogoJuegoTerminado.classList.remove('hidden')
}

// Crear una grilla en JS y en HTML con items aleatorios 
// Si hay matches, volver a generar una grilla

const grillaFacil = () => {
    do {
        vaciarGrillaHTML()
        generarGrilla(9, 9)
        generarGrillaEnHTML(9, 9, items)
    } while (hayMatchInicial())
}

const grillaNormal = () => {
    do {
        vaciarGrillaHTML()
        generarGrilla(8, 8)
        generarGrillaEnHTML(8, 8, items)
    } while (hayMatchInicial())
}

const grillaDificil = () => {
    do {
        vaciarGrillaHTML()
        generarGrilla(7, 7)
        generarGrillaEnHTML(7, 7, items)
    } while (hayMatchInicial())
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
//console.log(generarGrilla)


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

const vaciarGrillaHTML = () => {
    grillaHTML.textContent = ''
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

