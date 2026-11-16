

/*
 NESÍ AI — CONTROLADOR PRINCIPAL
 Versão 1.5
*/

const NesiApp = {

  nome: "NESÍ AI",
  versao: "1.5",

  inicializar() {
    const modulos = {
      jogos: typeof NesiGames !== "undefined",
      analise: typeof NesiAnalyzer !== "undefined",
      estatisticas: typeof NesiStatistics !== "undefined",
      graficos: typeof NesiCharts !== "undefined",
      validacao: typeof NesiValidator !== "undefined",
      laboratorio: typeof NesiModelLab !== "undefined",
      armazenamento: typeof NesiStorage !== "undefined",
      avaliador: typeof NesiModelEvaluator !== "undefined",
      motorAnalise: typeof NesiPredictionEngine !== "undefined"
    };

    const ativos = Object.values(modulos).filter(Boolean).length;

    return {
      nome: this.nome,
      versao: this.versao,
      modulos,
      totalModulos: ativos,
      estado: ativos === 9 ? "OPERACIONAL" : "EM INTEGRACAO"
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
      : null;
  },

  obterEstatisticas(dados) {
    return typeof NesiStatistics !== "undefined"
      ? NesiStatistics.resumo(dados)
      : null;
  },

  analisarHistorico(jogoId) {
    if (typeof NesiPredictionEngine === "undefined") {
      return {
        sucesso: false,
        mensagem: "Motor de análise não carregado."
      };
    }

    const historico = this.obterHistorico(jogoId);

    const valores = historico
      .map(registo => registo.resultado)
      .filter(valor =>
        typeof valor === "number" &&
        Number.isFinite(valor) &&
        valor > 0
      );

    return NesiPredictionEngine.analisar(valores);
  },

  executarExperiencia(dados, nomeModelo) {
    return typeof NesiModelLab !== "undefined"
      ? NesiModelLab.executar(dados, nomeModelo)
      : null;
  },

  compararExperiencias(resultadoA, resultadoB) {
    return typeof NesiModelLab !== "undefined"
      ? NesiModelLab.comparar(resultadoA, resultadoB)
      : null;
  },

  historicoExperiencias() {
    return typeof NesiModelLab !== "undefined"
      ? NesiModelLab.historico()
      : [];
  },

  avaliarModelo(reais, estimativas, nomeModelo) {
    return typeof NesiModelEvaluator !== "undefined"
      ? NesiModelEvaluator.avaliar(reais, estimativas, nomeModelo)
      : null;
  },

  compararModelos(resultadoA, resultadoB) {
    return typeof NesiModelEvaluator !== "undefined"
      ? NesiModelEvaluator.comparar(resultadoA, resultadoB)
      : null;
  },

  historicoAvaliacoes() {
    return typeof NesiModelEvaluator !== "undefined"
      ? NesiModelEvaluator.historico()
      : [];
  },

  guardarRegisto(jogoId, resultado) {
    return typeof NesiStorage !== "undefined"
      ? NesiStorage.adicionar(jogoId, resultado)
      : null;
  },

  obterHistorico(jogoId = null) {
    return typeof NesiStorage !== "undefined"
      ? NesiStorage.listar(jogoId)
      : [];
  },

  removerRegisto(id) {
    return typeof NesiStorage !== "undefined"
      ? NesiStorage.remover(id)
      : false;
  },

  limparHistorico(jogoId = null) {
    return typeof NesiStorage !== "undefined"
      ? NesiStorage.limpar(jogoId)
      : false;
  },

  exportarHistorico() {
    return typeof NesiStorage !== "undefined"
      ? NesiStorage.exportar()
      : null;
  },

  importarHistorico(conteudo) {
    return typeof NesiStorage !== "undefined"
      ? NesiStorage.importar(conteudo)
      : false;
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
