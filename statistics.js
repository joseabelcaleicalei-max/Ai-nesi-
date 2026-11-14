
/*
 NESÍ AI — MOTOR DE ESTATÍSTICAS
 Versão 1.0
*/

const NesiStatistics = {

  media(dados) {
    if (!Array.isArray(dados) || dados.length === 0) {
      return null;
    }

    return dados.reduce((a, b) => a + b, 0) / dados.length;
  },

  mediana(dados) {
    if (!Array.isArray(dados) || dados.length === 0) {
      return null;
    }

    const valores = [...dados].sort((a, b) => a - b);
    const meio = Math.floor(valores.length / 2);

    return valores.length % 2
      ? valores[meio]
      : (valores[meio - 1] + valores[meio]) / 2;
  },

  minimo(dados) {
    return dados.length ? Math.min(...dados) : null;
  },

  maximo(dados) {
    return dados.length ? Math.max(...dados) : null;
  },

  desvioPadrao(dados) {
    if (!Array.isArray(dados) || dados.length === 0) {
      return null;
    }

    const media = this.media(dados);

    const variancia = dados.reduce(
      (total, valor) => total + Math.pow(valor - media, 2),
      0
    ) / dados.length;

    return Math.sqrt(variancia);
  },

  frequencias(dados) {
    if (!Array.isArray(dados)) return {};

    return dados.reduce((resultado, valor) => {
      resultado[valor] = (resultado[valor] || 0) + 1;
      return resultado;
    }, {});
  },

  amplitude(dados) {
    if (!Array.isArray(dados) || dados.length === 0) {
      return null;
    }

    return this.maximo(dados) - this.minimo(dados);
  },

  resumo(dados) {
    if (!Array.isArray(dados) || dados.length === 0) {
      return {
        total: 0,
        mensagem: "Sem dados disponíveis."
      };
    }

    return {
      total: dados.length,
      media: this.media(dados),
      mediana: this.mediana(dados),
      minimo: this.minimo(dados),
      maximo: this.maximo(dados),
      desvioPadrao: this.desvioPadrao(dados),
      amplitude: this.amplitude(dados),
      frequencias: this.frequencias(dados)
    };
  }

};

if (typeof module !== "undefined" && module.exports) {
  module.exports = NesiStatistics;
}

