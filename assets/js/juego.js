const blackjack = (() => {
  let deck = [];
  const tipos = ["C", "D", "S", "H"];
  const especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  const btnPedir = document.querySelector("#btnPedir");
  const btnDetener = document.querySelector("#btnDetener");
  const btnNuevoJuego = document.querySelector("#btnNuevo");

  const puntosHtml = document.querySelectorAll("small");
  const divJugadorCartas = document.querySelectorAll(".divCartas");

  const iniciarJuego = (numJugadores = 2) => {
    deck = createDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHtml.forEach((elem) => (elem.innerText = 0));

    divJugadorCartas.forEach((elem) => (elem.innerHTML = ""));

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  const createDeck = () => {
    deck = [];
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
    return _.shuffle(deck);
  };

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw new Error("No cards in deck");
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    const puntos = isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    return puntos;
  };

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList = "carta";
    divJugadorCartas[turno].append(imgCarta);
  };

  const determinarJugador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;

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

  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
    determinarJugador();
  };

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Lo siento, perdiste");
      turnoComputadora(puntosJugador);

      btnPedir.disabled = true;
      btnDetener.disabled = true;
    } else if (puntosJugador === 21) {
      console.warn("genial, sacaste 21");
      turnoComputadora(puntosJugador);
      btnPedir.disabled = true;
      btnDetener.disabled = true;
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevoJuego.addEventListener("click", () => {
    iniciarJuego();
  });
  return {
    nuevoJuego: iniciarJuego,
  };
})();
