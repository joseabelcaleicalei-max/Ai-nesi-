
/*
 NESÍ AI — PAINEL CENTRAL
 Versão 1.0
*/

const NesiDashboard = {

  obterEstado() {
    if (typeof NesiApp === "undefined") {
      return {
        sucesso: false,
        mensagem: "Controlador principal indisponível."
      };
    }

    const estado = NesiApp.inicializar();

    return {
      sucesso: true,
      nome: estado.nome,
      versao: estado.versao,
      estado: estado.estado,
      modulosAtivos: estado.totalModulos,
      totalModulos: Object.keys(estado.modulos).length,
      modulos: estado.modulos
    };
  },

  obterResumo(jogoId = null) {
    if (typeof NesiApp === "undefined") {
      return null;
    }

    const historico = NesiApp.obterHistorico(jogoId);

    const valores = historico
      .map(registo => registo.resultado)
      .filter(valor => typeof valor === "number");

    return {
      totalRegistos: historico.length,
      totalNumerico: valores.length,
      estatisticas: valores.length >= 2
        ? NesiApp.obterEstatisticas(valores)
        : null
    };
  },

  obterEstimativa(jogoId, janela = 20) {
    if (typeof NesiApp === "undefined") return null;

    const historico = NesiApp.obterHistorico(jogoId);

    const valores = historico
      .map(registo => registo.resultado)
      .filter(valor => typeof valor === "number");

    if (valores.length < 5) {
      return {
        sucesso: false,
        mensagem: "São necessários pelo menos 5 registos numéricos."
      };
    }

    return NesiApp.analisarEstimativas(valores, janela);
  },

  obterAvaliacoes() {
    if (typeof NesiApp === "undefined") return [];

    return NesiApp.historicoAvaliacoes();
  },

  obterExperiencias() {
    if (typeof NesiApp === "undefined") return [];

    return NesiApp.historicoExperiencias();
  }

};

if (typeof window !== "undefined") {
  window.NesiDashboard = NesiDashboard;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = NesiDashboard;
}
