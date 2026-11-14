
/*
 NESÍ AI — MOTOR DE GRÁFICOS
 Versão 1.0
*/

const NesiCharts = {

  criarBarras(dados, elementoId) {
    const elemento = document.getElementById(elementoId);

    if (!elemento) return;

    if (!Array.isArray(dados) || dados.length === 0) {
      elemento.innerHTML =
        '<p class="notice">Sem dados para visualizar.</p>';
      return;
    }

    const frequencias = {};

    dados.forEach(valor => {
      const chave = String(valor);
      frequencias[chave] = (frequencias[chave] || 0) + 1;
    });

    const valores = Object.entries(frequencias);
    const maior = Math.max(...valores.map(item => item[1]));

    elemento.innerHTML = valores.map(([valor, quantidade]) => {
      const altura = Math.max(5, quantidade / maior * 130);

      return `
        <div style="
          flex:1;
          min-width:12px;
          height:${altura}px;
          background:#d6ad45;
          border-radius:4px 4px 0 0;
          position:relative;
        "
        title="${valor}: ${quantidade} ocorrências">
        </div>
      `;
    }).join("");
  },

  criarHistorico(dados, elementoId) {
    const elemento = document.getElementById(elementoId);

    if (!elemento) return;

    elemento.innerHTML = dados
      .slice(-40)
      .reverse()
      .map(valor => `
        <div class="history-item">
          ${valor}
        </div>
      `)
      .join("");
  }

};

if (typeof module !== "undefined" && module.exports) {
  module.exports = NesiCharts;
}

