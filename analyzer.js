
/*
 NESÍ AI — MOTOR ANALÍTICO
 Versão 1.0
 Análise estatística de conjuntos de dados.
*/

const NesiAnalyzer = {

  validar(dados) {
    return Array.isArray(dados) &&
      dados.length > 0 &&
      dados.every(
        valor =>
          typeof valor === "number" &&
          Number.isFinite(valor)
      );
  },

  analisar(dados) {
    if (!this.validar(dados)) {
      return {
        sucesso: false,
        mensagem: "Dados inválidos ou insuficientes."
      };
    }

    const ordenados = [...dados].sort((a, b) => a - b);
    const total = dados.length;

    const soma = dados.reduce((a, b) => a + b, 0);
    const media = soma / total;

    const minimo = ordenados[0];
    const maximo = ordenados[total - 1];

    const mediana = total % 2 === 0
      ? (ordenados[total / 2 - 1] +
         ordenados[total / 2]) / 2
      : ordenados[Math.floor(total / 2)];

    const variancia = dados.reduce(
      (acc, valor) => acc + Math.pow(valor - media, 2),
      0
    ) / total;

    const desvioPadrao = Math.sqrt(variancia);

    const amplitude = maximo - minimo;

    return {
      sucesso: true,
      total,
      soma,
      media: this.arredondar(media),
      mediana: this.arredondar(mediana),
      minimo,
      maximo,
      amplitude: this.arredondar(amplitude),
      variancia: this.arredondar(variancia),
      desvioPadrao: this.arredondar(desvioPadrao),
      tendencia: this.tendencia(dados),
      distribuicao: this.distribuicao(dados)
    };
  },

  tendencia(dados) {
    if (dados.length < 2) {
      return "Dados insuficientes para comparação.";
    }

    const metade = Math.floor(dados.length / 2);

    const primeira = dados.slice(0, metade);
    const segunda = dados.slice(metade);

    const mediaInicial =
      primeira.reduce((a, b) => a + b, 0) /
      primeira.length;

    const mediaFinal =
      segunda.reduce((a, b) => a + b, 0) /
      segunda.length;

    if (mediaFinal > mediaInicial) {
      return "A média da segunda parte é superior.";
    }

    if (mediaFinal < mediaInicial) {
      return "A média da segunda parte é inferior.";
    }

    return "As médias das duas partes são iguais.";
  },

  distribuicao(dados) {
    const grupos = {
      "0–19": 0,
      "20–39": 0,
      "40–59": 0,
      "60–79": 0,
      "80–100": 0,
      "Outros": 0
    };

    dados.forEach(valor => {
      if (valor >= 0 && valor < 20) grupos["0–19"]++;
      else if (valor < 40 && valor >= 20) grupos["20–39"]++;
      else if (valor < 60 && valor >= 40) grupos["40–59"]++;
      else if (valor < 80 && valor >= 60) grupos["60–79"]++;
      else if (valor <= 100 && valor >= 80) grupos["80–100"]++;
      else grupos["Outros"]++;
    });

    return grupos;
  },

  arredondar(valor) {
    return Number(valor.toFixed(2));
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = NesiAnalyzer;
}

