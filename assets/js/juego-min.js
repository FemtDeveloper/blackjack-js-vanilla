const blackjack = (() => {
  let e = [];
  const t = ["C", "D", "S", "H"],
    n = ["A", "J", "Q", "K"];
  let r = [];
  const a = document.querySelector("#btnPedir"),
    o = document.querySelector("#btnDetener"),
    l = document.querySelector("#btnNuevo"),
    s = document.querySelectorAll("small"),
    c = document.querySelectorAll(".divCartas"),
    d = (t = 2) => {
      (e = i()), (r = []);
      for (let e = 0; e < t; e++) r.push(0);
      s.forEach((e) => (e.innerText = 0)),
        c.forEach((e) => (e.innerHTML = "")),
        (a.disabled = !1),
        (o.disabled = !1);
    },
    i = () => {
      e = [];
      for (let n = 2; n <= 10; n++) for (let r of t) e.push(n + r);
      for (let r of t) for (let t of n) e.push(t + r);
      return _.shuffle(e);
    },
    u = () => {
      if (0 === e.length) throw new Error("No cards in deck");
      return e.pop();
    },
    b = (e, t) => (
      (r[t] =
        r[t] +
        ((e) => {
          const t = e.substring(0, e.length - 1);
          return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
        })(e)),
      (s[t].innerText = r[t]),
      r[t]
    ),
    f = (e, t) => {
      const n = document.createElement("img");
      (n.src = `./assets/cartas/${e}.png`),
        (n.classList = "carta"),
        c[t].append(n);
    },
    g = (e) => {
      let t = 0;
      do {
        const n = u();
        if (((t = b(n, r.length - 1)), f(n, r.length - 1), e > 21)) break;
      } while (t < e && e <= 21);
      (() => {
        const [e, t] = r;
        setTimeout(() => {
          t === e
            ? alert("Es un empate")
            : e > 21
            ? alert("Computadora gana")
            : t > 21
            ? alert("Jugador gana")
            : t > e && t <= 21 && alert("Computadora gana");
        }, 200);
      })();
    };
  return (
    a.addEventListener("click", () => {
      const e = u(),
        t = b(e, 0);
      f(e, 0),
        t > 21
          ? (console.warn("Lo siento, perdiste"),
            g(t),
            (a.disabled = !0),
            (o.disabled = !0))
          : 21 === t &&
            (console.warn("genial, sacaste 21"),
            g(t),
            (a.disabled = !0),
            (o.disabled = !0));
    }),
    o.addEventListener("click", () => {
      (a.disabled = !0), (o.disabled = !0), g(r[0]);
    }),
    l.addEventListener("click", () => {
      d();
    }),
    { nuevoJuego: d }
  );
})();
