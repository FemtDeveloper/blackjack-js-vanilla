let deck = [];
const tipos = ["C", "D", "S", "H"];
const especiales = ["A", "J", "Q", "K"];

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
  console.log(deck);
  return deck;
};
createDeck();

const pedirCarta = () => {
  if (deck.length === 0) {
    throw new Error("No cards in deck");
  }
  let carta = deck.pop();
  console.log(deck);
  console.log(carta);
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  let puntos = 0;
  isNaN(valor) ? (puntos = valor === "A" ? 11 : 10) : (puntos = valor * 1);
  console.log(puntos);
};

valorCarta("AD");
