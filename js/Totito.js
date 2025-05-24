// Juego y codigo extraido de Github

const style = document.createElement('style');
style.textContent = `
  body {
    font-family: Arial, sans-serif;
    text-align: center;
  }
  #tablero {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    gap: 5px;
    justify-content: center;
    margin: 20px auto;
  }
  .celda {
    width: 100px;
    height: 100px;
    background-color: #eaeaea;
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  button {
    padding: 10px 20px;
    font-size: 1em;
  }
`;
document.head.appendChild(style);

// Crear elementos HTML
const titulo = document.createElement("h1");
titulo.textContent = "Totito";
document.body.appendChild(titulo);

const tablero = document.createElement("div");
tablero.id = "tablero";
document.body.appendChild(tablero);

const mensaje = document.createElement("p");
mensaje.id = "mensaje";
document.body.appendChild(mensaje);

const boton = document.createElement("button");
boton.textContent = "Reiniciar";
boton.onclick = reiniciarJuego;
document.body.appendChild(boton);

// Variables de juego
let celdas = [];
let turno = "X";
let terminado = false;

function crearTablero() {
  tablero.innerHTML = "";
  celdas = [];
  terminado = false;
  mensaje.textContent = "Turno de X";
  for (let i = 0; i < 9; i++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    celda.addEventListener("click", () => jugar(i));
    tablero.appendChild(celda);
    celdas.push(celda);
  }
}

function jugar(i) {
  if (celdas[i].textContent === "" && !terminado) {
    celdas[i].textContent = turno;
    if (verificarGanador()) {
      mensaje.textContent = `¡${turno} ha ganado! 🎉`;
      terminado = true;
    } else if (celdas.every(c => c.textContent !== "")) {
      mensaje.textContent = "¡Empate!";
      terminado = true;
    } else {
      turno = turno === "X" ? "O" : "X";
      mensaje.textContent = `Turno de ${turno}`;
    }
  }
}

function verificarGanador() {
  const combinaciones = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return combinaciones.some(comb => {
    const [a, b, c] = comb;
    return celdas[a].textContent &&
           celdas[a].textContent === celdas[b].textContent &&
           celdas[a].textContent === celdas[c].textContent;
  });
}

function reiniciarJuego() {
  turno = "X";
  crearTablero();
}

crearTablero();