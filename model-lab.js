
/*
 NESÍ AI — LABORATÓRIO DE MODELOS
 Versão 1.0
*/

const NesiModelLab = {

  experiencias: [],

  executar(dados, nomeModelo = "Modelo experimental") {

    if (!Array.isArray(dados) || dados.length < 2) {
      return {
        sucesso: false,
        mensagem: "Dados insuficientes para a experiência."
      };
    }

    const validos = dados.filter(valor =>
      typeof valor === "number" &&
      Number.isFinite(valor)
    );

    if (validos.length < 2) {
      return {
        sucesso: false,
        mensagem: "Não existem dados numéricos suficientes."
      };
    }

    const media = validos.reduce((a, b) => a + b, 0)
      / validos.length;

    const variancia = validos.reduce(
      (soma, valor) => soma + Math.pow(valor - media, 2),
      0
    ) / validos.length;

    const resultado = {
      id: this.experiencias.length + 1,
      modelo: nomeModelo,
      quantidade: validos.length,
      media: this.arredondar(media),
      variancia: this.arredondar(variancia),
      desvioPadrao: this.arredondar(Math.sqrt(variancia)),
      minimo: Math.min(...validos),
      maximo: Math.max(...validos),
      data: new Date().toISOString()
    };

    this.experiencias.push(resultado);

    return {
      sucesso: true,
      resultado
    };
  },

  comparar(resultadoA, resultadoB) {

    if (!resultadoA || !resultadoB) {
      return {
        sucesso: false,
        mensagem: "São necessários dois resultados."
      };
    }

    return {
      sucesso: true,
      diferencaMedia: this.arredondar(
        resultadoA.media - resultadoB.media
      ),
      diferencaDesvio: this.arredondar(
        resultadoA.desvioPadrao - resultadoB.desvioPadrao
      )
    };
  },

  historico() {
    return [...this.experiencias];
  },

  limpar() {
    this.experiencias = [];
    return true;
  },

  arredondar(valor) {
    return Number(valor.toFixed(4));
  }

};

if (typeof window !== "undefined") {
  window.NesiModelLab = NesiModelLab;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = NesiModelLab;
}

