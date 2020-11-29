const grillaHTML = document.querySelector("#grilla")
const botonNuevoJuego = document.querySelector("#boton-nuevo-juego")
const botonReiniciarJuego = document.querySelector("#boton-reiniciar-juego")
const botonBuscarMatch = document.querySelector("#boton-buscar-match")
const botonModoFacil = document.querySelector("#boton-modo-facil")
const botonModoNormal = document.querySelector("#boton-modo-normal")
const botonModoDificil = document.querySelector("#boton-modo-dificil")
const mosaicos = document.getElementsByClassName('mosaico')
const items = ['🐺', '🦊', '🦝 ', '🐻 ', '🐨 ', '🐦','🍄','🌲','🍁',]
console.log(items)


//alert('Bienvenidx') //la comento para poder trabajar mas tranquila


//Pedir al usuario que elija la dificultad de la partida

// let dificultad = ''
// botonModoFacil.onclick = () => {
//     dificultad = 9
//     return generarGrilla(9, 9)
// }

// botonModoNormal.onclick = () => {
//     dificultad = 8
//     return generarGrilla(8, 8)
// }

// botonModoDificil.onclick = () => {
//     dificultad = 7
//     return generarGrilla(7, 7)
// }

// Crear una grilla en JS y en HTML con items aleatorios 

const obtenerNumeroAlAzar = items => {
    return Math.floor((Math.random() * items.length))
}

const obtenerItemAlAzar = items => {
    return items[obtenerNumeroAlAzar(items)]
}

let grilla = []
const generarGrilla = () => {

    grilla = []
    for (let i = 0; i < 10; i++) {
        grilla[i] = []
        for (let j = 0; j < 10; j++) {
            grilla[i][j] = obtenerItemAlAzar(items)
        }
    }
    return grilla
}
console.log(generarGrilla)


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

const generarGrillaEnHTML = () => {
    const anchoDeGrilla = 50 * 10
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

//--------------FALTA HACER----------------
// loop      // Chequeamos que si hay matches
// Si hay matches, volvemos a generar una grilla
//-----------------------------------------

// //--------------FALTA HACER----------------
// //Opciones nuevo juego

botonNuevoJuego.onclick = () => {
    
}

botonReiniciarJuego.onclick = () => {
    
}
// //-----------------------------------------



// Si no hay bloques, 
// el usuario hace click en un mosaico
// el usuario hace click en otro mosaico
// chequeamos si moviendo los mosaicos de lugar hay matches
// si no hay, volvemos elementos a la posicion original
// si hay, mantenemos los elementos en la nueva posicion
// 

//Seleccionar mosaico al hacer click en el
const primerMosaicoSeleccionado = ''
for (let mosaico of mosaicos) {
    mosaico.onclick = () => {
        mosaico.classList.add('seleccionado')
        const primerMosaicoSeleccionado = mosaico
        console.log(primerMosaicoSeleccionado)
    }
}


// desaparecen las frutas
// elimino los elementos tanto en HTML como en JS 

// primera version: rellenar con elementos al azar

// segunda version: hacer que los elementos "caigan"
// mientras haya items con posiciones vacias por debajo, 
// obtener la cantidad de posciones vacias que tiene debajo
// bajar el item esas pisiciones
// rellenar posiciones restantes (las de mas arriba) con elementos al azar
