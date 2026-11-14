

/*
 NESÍ AI — CONTROLADOR PRINCIPAL
 Versão 1.1
*/

const NesiApp = {

  nome: "NESÍ AI",
  versao: "1.1",

  inicializar() {
    const modulos = {
      jogos: typeof NesiGames !== "undefined",
      analise: typeof NesiAnalyzer !== "undefined",
      estatisticas: typeof NesiStatistics !== "undefined",
      graficos: typeof NesiCharts !== "undefined",
      validacao: typeof NesiValidator !== "undefined"
    };

    const ativos = Object.values(modulos).filter(Boolean).length;

    return {
      nome: this.nome,
      versao: this.versao,
      modulos,
      totalModulos: ativos,
      estado: ativos === 5 ? "OPERACIONAL" : "EM INTEGRACAO"
    };
  },

  obterJogos() {
    return typeof NesiGames !== "undefined"
      ? NesiGames.listar()
      : [];
  },

  validarDados(dados) {
    return typeof NesiValidator !== "undefined"
      ? NesiValidator.validar(dados)
      : null;
  },

  analisarDados(dados) {
    return typeof NesiAnalyzer !== "undefined"
      ? NesiAnalyzer.analisar(dados)
      : {
          sucesso: false,
          mensagem: "Motor de análise indisponível."
        };
  },

  obterEstatisticas(dados) {
    return typeof NesiStatistics !== "undefined"
      ? NesiStatistics.resumo(dados)
      : null;
  },

  gerarGrafico(dados, elementoId) {
    if (typeof NesiCharts === "undefined") return false;

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
