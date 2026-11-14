
/*
 NESÍ AI — GESTOR DE JOGOS
 Versão 1.0
*/

const NesiGames = {

  catalogo: {
    aviator: {
      nome: "Aviator",
      tipo: "multiplicador",
      unidade: "x",
      descricao: "Registos históricos de multiplicadores."
    },

    spaceman: {
      nome: "Spaceman",
      tipo: "multiplicador",
      unidade: "x",
      descricao: "Registos históricos de multiplicadores."
    },

    jetx: {
      nome: "JetX",
      tipo: "multiplicador",
      unidade: "x",
      descricao: "Registos históricos de multiplicadores."
    },

    bacbo: {
      nome: "Bac Bo",
      tipo: "categorico",
      resultados: ["Player", "Banker", "Tie"],
      descricao: "Registos históricos de categorias."
    }
  },

  listar() {
    return Object.entries(this.catalogo).map(
      ([id, jogo]) => ({
        id,
        nome: jogo.nome,
        tipo: jogo.tipo
      })
    );
  },

  obter(id) {
    return this.catalogo[id] || null;
  },

  validarMultiplicador(valor) {
    return (
      typeof valor === "number" &&
      Number.isFinite(valor) &&
      valor >= 1
    );
  },

  validarResultado(id, resultado) {
    const jogo = this.obter(id);

    if (!jogo) return false;

    if (jogo.tipo === "multiplicador") {
      return this.validarMultiplicador(resultado);
    }

    if (jogo.tipo === "categorico") {
      return jogo.resultados.includes(resultado);
    }

    return false;
  },

  formatar(id, resultado) {
    const jogo = this.obter(id);

    if (!jogo || !this.validarResultado(id, resultado)) {
      return null;
    }

    if (jogo.tipo === "multiplicador") {
      return `${resultado.toFixed(2)}${jogo.unidade}`;
    }

    return resultado;
  }

};

if (typeof module !== "undefined" && module.exports) {
  module.exports = NesiGames;
}
