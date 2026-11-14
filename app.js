

/*
 NESÍ AI — CONTROLADOR PRINCIPAL
 Versão 1.0
*/

const NesiApp = {

  versao: "1.0",
  nome: "NESÍ AI",

  inicializar() {
    const modulos = {
      jogos: typeof NesiGames !== "undefined",
      analise: typeof NesiAnalyzer !== "undefined",
      estatisticas: typeof NesiStatistics !== "undefined",
      graficos: typeof NesiCharts !== "undefined"
    };

    const ativos = Object.values(modulos).filter(Boolean).length;

    return {
      nome: this.nome,
      versao: this.versao,
      modulos,
      totalModulos: ativos,
      estado: ativos === 4 ? "OPERACIONAL" : "EM INTEGRACAO"
    };
  },

  obterJogos() {
    if (typeof NesiGames === "undefined") {
      return [];
    }

    return NesiGames.listar();
  },

  analisarDados(dados) {
    if (typeof NesiAnalyzer === "undefined") {
      return {
        sucesso: false,
        mensagem: "Motor de análise indisponível."
      };
    }

    return NesiAnalyzer.analisar(dados);
  },

  obterEstatisticas(dados) {
    if (typeof NesiStatistics === "undefined") {
      return null;
    }

    return NesiStatistics.resumo(dados);
  },

  gerarGrafico(dados, elementoId) {
    if (typeof NesiCharts === "undefined") {
      return false;
    }

    NesiCharts.criarBarras(dados, elementoId);
    return true;
  }

};

if (typeof window !== "undefined") {
  window.NesiApp = NesiApp;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = NesiApp;
}
