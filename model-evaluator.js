
/*
 NESÍ AI — AVALIADOR DE MODELOS
 Versão 1.0
 Avaliação estatística e comparação experimental.
*/

const NesiModelEvaluator = {

  resultados: [],

  avaliar(dadosReais, estimativas, nomeModelo) {

    if (
      !Array.isArray(dadosReais) ||
      !Array.isArray(estimativas) ||
      dadosReais.length === 0 ||
      dadosReais.length !== estimativas.length
    ) {
      return {
        sucesso: false,
        mensagem: "Conjuntos de dados incompatíveis."
      };
    }

    const validos = dadosReais.every((valor, i) =>
      typeof valor === "number" &&
      Number.isFinite(valor) &&
      typeof estimativas[i] === "number" &&
      Number.isFinite(estimativas[i])
    );

    if (!validos) {
      return {
        sucesso: false,
        mensagem: "Existem valores inválidos."
      };
    }

    const erros = dadosReais.map((real, i) =>
      Math.abs(real - estimativas[i])
    );

    const erroMedio = erros.reduce(
      (a, b) => a + b, 0
    ) / erros.length;

    const erroQuadratico = Math.sqrt(
      erros.reduce(
        (soma, erro) => soma + erro * erro, 0
      ) / erros.length
    );

    const resultado = {
      modelo: nomeModelo || "Modelo experimental",
      amostras: dadosReais.length,
      erroMedio: this.arredondar(erroMedio),
      erroQuadratico: this.arredondar(erroQuadratico),
      avaliacao: this.classificar(erroMedio),
      data: new Date().toISOString()
    };

    this.resultados.push(resultado);

    return {
      sucesso: true,
      resultado
    };
  },

  classificar(erro) {
    if (erro === 0) return "CORRESPONDÊNCIA EXATA";
    return "ERRO MEDIDO — consultar métricas";
  },

  comparar(modeloA, modeloB) {

    if (!modeloA || !modeloB) {
      return {
        sucesso: false,
        mensagem: "Dois resultados são necessários."
      };
    }

    return {
      sucesso: true,
      diferencaErroMedio: this.arredondar(
        modeloA.erroMedio - modeloB.erroMedio
      ),
      diferencaErroQuadratico: this.arredondar(
        modeloA.erroQuadratico - modeloB.erroQuadratico
      )
    };
  },

  historico() {
    return [...this.resultados];
  },

  limpar() {
    this.resultados = [];
    return true;
  },

  arredondar(valor) {
    return Number(valor.toFixed(4));
  }

};

if (typeof window !== "undefined") {
  window.NesiModelEvaluator = NesiModelEvaluator;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = NesiModelEvaluator;
}

