const body = document.body;
const grillaHTML = document.querySelector('#grilla');
const dialogoNuevoJuego = document.querySelector('#dialogo-nuevo-juego');
const botonesNuevoJuego = document.querySelectorAll('#boton-nuevo-juego');
const botonReiniciarJuego = document.querySelector('#boton-reiniciar-juego');
const botonBuscarMatch = document.querySelector('#boton-buscar-match');
const botonModoFacil = document.querySelector('#boton-modo-facil');
const botonModoNormal = document.querySelector('#boton-modo-normal');
const botonModoDificil = document.querySelector('#boton-modo-dificil');
const items = [ '🐺', '🦊', '🦝 ', '🐻 ', '🐨 ', '🐦' ];
let mosaicos = [];
let mosaicoSeleccionado = null;
const tiempoRestanteHTML = document.querySelector('#tiempo-restante');
const overlay = document.querySelector('#overlay');
const dialogoJuegoTerminado = document.querySelector('#dialogo-juego-terminado');
const botonAyuda = document.querySelector('#boton-ayuda');
const botonIconoRestart = document.querySelector('#boton-restart');
const dialogoBienvenida = document.querySelector('#dialogo-bienvenida');
const dialogoReiniciarJuego = document.querySelector('#dialogo-reiniciar-juego');
const botonAJugar = document.querySelector('#boton-empezar-juego');
const ventanasDeDialogo = document.querySelectorAll('.dialogo');
const botonCancelar = document.querySelector('#boton-cancelar');

//Comportamiento general del overlay
const abrirModal = () => {
	overlay.classList.remove('hidden');
	//body.classList.add('no-scroll')
};

const cerrarModal = () => {
	overlay.classList.add('hidden');

	for (let dialogo of ventanasDeDialogo) {
		dialogo.classList.add('hidden');
	}
};

//Comportamiento general de modales y botones
window.onload = () => {
	dialogoBienvenida.classList.remove('hidden');
};

botonAyuda.onclick = () => {
	abrirModal();
	dialogoBienvenida.classList.remove('hidden');
};

botonIconoRestart.onclick = () => {
	abrirModal();
	dialogoReiniciarJuego.classList.remove('hidden');
};

botonAJugar.onclick = () => {
	botonAJugar.parentElement.parentElement.classList.add('hidden');
	dialogoNuevoJuego.classList.remove('hidden');
};

for (let boton of botonesNuevoJuego) {
	boton.onclick = () => {
		boton.parentElement.parentElement.classList.add('hidden');
		dialogoNuevoJuego.classList.remove('hidden');
	};
}

botonCancelar.onclick = () => {
	cerrarModal();
};

botonAJugar.onclick = () => {
	botonAJugar.parentElement.parentElement.classList.add('hidden');
	dialogoNuevoJuego.classList.remove('hidden');
};

for (let boton of botonesNuevoJuego) {
	boton.onclick = () => {
		boton.parentElement.parentElement.classList.add('hidden');
		dialogoNuevoJuego.classList.remove('hidden');
	};
}

botonCancelar.onclick = () => {
	cerrarModal();
};

//Pedir al usuario que elija la dificultad de la partida
let nivelDificultad = ''; //Almaceno niveles de dificultad para reutilizar luego

const reemplazarMatches = () => {
	let matches = matchesHorizontales().concat(matchesVerticales());
	for (let i = 0; i < matches.length; i++) {
		let x = matches[i][0];
		let y = matches[i][1];
		grilla[x][y] = obtenerItemAlAzar(items);
		let mosaicoMatch = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);
		mosaicoMatch.classList.add('animacion-desaparecer');
		setTimeout(() => {
			mosaicoMatch.innerHTML = grilla[x][y];
			mosaicoMatch.classList.remove('animacion-desaparecer');
			mosaicoMatch.classList.add('animacion-aparecer');
			if (hayMatch()) {
				reemplazarMatches();
			}
		}, 500);
	}
};

const clicksMosaicos = (elementos) => {
	for (let elemento of elementos) {
		elemento.onclick = () => {
			if (mosaicoSeleccionado) {
				if (sonAdyacentes(elemento, mosaicoSeleccionado)) {
					intercambiarMosaicos(elemento, mosaicoSeleccionado);
					if (hayMatch()) {
						//vaciar matches
						reemplazarMatches();
					} else {
						let mosaicoSeleccionadoPrevio = mosaicoSeleccionado;
						setTimeout(() => intercambiarMosaicos(elemento, mosaicoSeleccionadoPrevio), 500);
					}
				}
				mosaicoSeleccionado.classList.remove('seleccionado');
				mosaicoSeleccionado = null;
			} else {
				elemento.classList.add('seleccionado');
				mosaicoSeleccionado = elemento;
			}
		};
	}
};

botonModoFacil.onclick = () => {
	grillaFacil();
	cuentaRegresiva();
	cerrarModal();
	clicksMosaicos(mosaicos);
	nivelDificultad = 'facil';
};

botonModoNormal.onclick = () => {
	grillaNormal();
	cuentaRegresiva();
	cerrarModal();
	clicksMosaicos(mosaicos);
	nivelDificultad = 'normal';
};

botonModoDificil.onclick = () => {
	grillaDificil();
	cuentaRegresiva();
	cerrarModal();
	clicksMosaicos(mosaicos);
	nivelDificultad = 'dificil';
};

const revisarDificultadElegida = () => {
	if (nivelDificultad === 'facil') {
		grillaFacil();
	} else if (nivelDificultad === 'normal') {
		grillaNormal();
	} else if (nivelDificultad === 'dificil') {
		grillaDificil();
	}
};

//Empezar cuenta regresiva al crear un juego nuevo --------FUNCIONA AL INICIO, TIENE BUG AL REINICIAR----
let tiempoRestante = 3;

const cuentaRegresiva = () => {
	tiempoRestanteHTML.textContent = `0:${tiempoRestante}`;

	if (tiempoRestante > 0) {
		tiempoRestante--;
		// setTimeout(cuentaRegresiva, 1000);
	} else {
		tiempoRestante = 3;
		terminarJuego();
	}
};

botonReiniciarJuego.onclick = () => {
	console.log('Pepo');
	revisarDificultadElegida();
	//dialogoNuevoJuego.classList.remove('hidden')
	cuentaRegresiva();
	cerrarModal();
};

const terminarJuego = () => {
	dialogoNuevoJuego.classList.add('hidden');
	abrirModal();
	dialogoJuegoTerminado.classList.remove('hidden');
};

// Crear una grilla en JS y en HTML con items aleatorios
// Si hay matches, volver a generar una grilla

const grillaFacil = () => {
	do {
		vaciarGrillaHTML();
		generarGrilla(9, 9);
		generarGrillaEnHTML(9, 9, items);
	} while (hayMatch());
};

const grillaNormal = () => {
	do {
		vaciarGrillaHTML();
		generarGrilla(8, 8);
		generarGrillaEnHTML(8, 8, items);
	} while (hayMatch());
};

const grillaDificil = () => {
	do {
		vaciarGrillaHTML();
		generarGrilla(7, 7);
		generarGrillaEnHTML(7, 7, items);
	} while (hayMatch());
};

const obtenerNumeroAlAzar = (items) => {
	return Math.floor(Math.random() * items.length);
};

const obtenerItemAlAzar = (items) => {
	return items[obtenerNumeroAlAzar(items)];
};

let grilla = [];
const generarGrilla = (filas, columnas) => {
	grilla = [];
	for (let i = 0; i < filas; i++) {
		grilla[i] = [];
		for (let j = 0; j < columnas; j++) {
			grilla[i][j] = obtenerItemAlAzar(items);
		}
	}
	return grilla;
};

const generarMosaicos = (x, y, array) => {
	const tamanio = 50;

	const mosaico = document.createElement('div');

	mosaico.classList.add('mosaico');
	mosaico.dataset.x = x;
	mosaico.dataset.y = y;
	mosaico.innerHTML = array[x][y];
	mosaico.style.top = `${x * tamanio}px`;
	mosaico.style.left = `${y * tamanio}px`;
	return mosaico;
};

const generarGrillaEnHTML = (filas, columnas, items) => {
	const anchoDeGrilla = 50 * columnas;
	grillaHTML.style.width = `${anchoDeGrilla}px`;
	const listadeItems = grilla;
	for (let i = 0; i < listadeItems.length; i++) {
		for (let j = 0; j < listadeItems[i].length; j++) {
			grillaHTML.appendChild(generarMosaicos(i, j, listadeItems));
		}
	}
	mosaicos = document.getElementsByClassName('mosaico');
};

const intercambiarMosaicos = (elem1, elem2) => {
	const tamanio = 50;

	const datax1 = Number(elem1.dataset.x);
	const datax2 = Number(elem2.dataset.x);
	const datay1 = Number(elem1.dataset.y);
	const datay2 = Number(elem2.dataset.y);

	// modifico la grilla en JS
	let variableTemporal = grilla[datax1][datay1];
	grilla[datax1][datay1] = grilla[datax2][datay2];
	grilla[datax2][datay2] = variableTemporal;

	// modifico la grilla en HTML
	elem1.style.top = `${datax2 * tamanio}px`;
	elem2.style.top = `${datax1 * tamanio}px`;
	elem1.style.left = `${datay2 * tamanio}px`;
	elem2.style.left = `${datay1 * tamanio}px`;

	elem1.dataset.x = datax2;
	elem2.dataset.x = datax1;
	elem1.dataset.y = datay2;
	elem2.dataset.y = datay1;
};

const sonAdyacentes = (mosaico1, mosaico2) => {
	const datax1 = Number(mosaico1.dataset.x);
	const datay1 = Number(mosaico1.dataset.y);
	const datax2 = Number(mosaico2.dataset.x);
	const datay2 = Number(mosaico2.dataset.y);

	if (
		(datax1 === datax2 && datay1 === datay2 + 1) ||
		(datax1 === datax2 && datay1 === datay2 - 1) ||
		(datay1 === datay2 && datax1 === datax2 + 1) ||
		(datay1 === datay2 && datax1 === datax2 - 1)
	) {
		return true;
	}
	return false;
};

const hayMatch = () => {
	return matchesVerticales().length > 0 || matchesHorizontales().length > 0;
};

const matchesVerticales = () => {
	let matchVertical = [];

	for (let i = 0; i < grilla.length; i++) {
		for (let j = 0; j < grilla[i].length; j++) {
			if (
				grilla[i + 1] &&
				grilla[i + 2] &&
				grilla[i][j] === grilla[i + 1][j] &&
				grilla[i][j] === grilla[i + 2][j]
			) {
				matchVertical = matchVertical.concat([ [ i, j ], [ i + 1, j ], [ i + 2, j ] ]);
			}
		}
	}
	return matchVertical;
};

const matchesHorizontales = () => {
	let matchHorizontal = [];

	for (let i = 0; i < grilla.length; i++) {
		for (let j = 0; j < grilla[i].length; j++) {
			if (grilla[i][j] === grilla[i][j + 1] && grilla[i][j] === grilla[i][j + 2]) {
				matchHorizontal = matchHorizontal.concat([ [ i, j ], [ i, j + 1 ], [ i, j + 2 ] ]);
			}
		}
	}
	return matchHorizontal;
};

const vaciarGrillaHTML = () => {
	grillaHTML.textContent = '';
};

// primera version: rellenar con elementos al azar

// segunda version: hacer que los elementos "caigan"
// mientras haya items con posiciones vacias por debajo,
// obtener la cantidad de posciones vacias que tiene debajo
// bajar el item esas pisiciones
// rellenar posiciones restantes (las de mas arriba) con elementos al azar
