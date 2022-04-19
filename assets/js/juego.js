let deck = [];
const tipos = ["C", "D", "S", "H"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0;
let puntosComputadora = 0;

const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevoJuego = document.querySelector("#btnNuevo");

const puntosHtml = document.querySelectorAll("small");
const divJugadorCartas = document.querySelector("#jugador-cartas");
const divComputadoraCartas = document.querySelector("#computadora-cartas");
const allImages = document.querySelectorAll("img");

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  deck = _.shuffle(deck);
  // console.log(deck);
  return deck;
};
createDeck();

const pedirCarta = () => {
  if (deck.length === 0) {
    throw new Error("No cards in deck");
  }
  let carta = deck.pop();
  // console.log(deck);
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  const puntos = isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  return puntos;
};

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    const imgCarta = document.createElement("img");

    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList = "carta";

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHtml[1].innerText = puntosComputadora;
    divComputadoraCartas.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Es un empate");
    } else if (puntosMinimos > 21) {
      alert("Computadora gana");
    } else if (puntosComputadora > 21) {
      alert("Jugador gana");
    } else if (puntosComputadora > puntosMinimos && puntosComputadora <= 21) {
      alert("Computadora gana");
    }
  }, 200);
};

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  const imgCarta = document.createElement("img");

  imgCarta.src = `./assets/cartas/${carta}.png`;
  imgCarta.classList = "carta";

  puntosJugador = puntosJugador + valorCarta(carta);

  puntosHtml[0].innerText = puntosJugador;

  divJugadorCartas.append(imgCarta);
  if (puntosJugador > 21) {
    console.warn("Lo siento, perdiste");
    turnoComputadora(puntosJugador);
    btnPedir.disabled = true;
    btnDetener.disabled = true;
  } else if (puntosJugador === 21) {
    turnoComputadora(puntosJugador);
    btnPedir.disabled = true;
    console.warn("genial, sacaste 21");
    btnDetener.disabled = true;
  }

  // console.log(valorCarta(carta));
  // console.log(carta);
  // console.log(puntosJugador);
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevoJuego.addEventListener("click", () => {
  deck = [];
  createDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  // console.log(deck);
  puntosHtml[0].innerText = puntosJugador;
  puntosHtml[1].innerText = puntosComputadora;
  divJugadorCartas.innerText = "";
  divComputadoraCartas.innerText = "";
  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
