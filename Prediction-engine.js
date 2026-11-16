
window.NesiPredictionEngine = {
  analisar(dados) {
    const valores = dados
      .map(Number)
      .filter(v => Number.isFinite(v) && v > 0);

    if (valores.length === 0) {
      return {
        sucesso: false,
        mensagem: "Não existem dados numéricos suficientes."
      };
    }

    const ordenados = [...valores].sort((a, b) => a - b);
    const total = valores.length;
    const soma = valores.reduce((a, b) => a + b, 0);
    const media = soma / total;

    const mediana = total % 2 === 0
      ? (ordenados[total / 2 - 1] + ordenados[total / 2]) / 2
      : ordenados[Math.floor(total / 2)];

    const variancia = valores.reduce(
      (s, v) => s + Math.pow(v - media, 2), 0
    ) / total;

    const desvio = Math.sqrt(variancia);

    return {
      sucesso: true,
      quantidade: total,
      media: Number(media.toFixed(2)),
      mediana: Number(mediana.toFixed(2)),
      minimo: ordenados[0],
      maximo: ordenados[total - 1],
      desvioPadrao: Number(desvio.toFixed(2)),
      amplitude: Number((ordenados[total - 1] - ordenados[0]).toFixed(2)),
      mensagem: "Análise estatística concluída."
    };
  }
};
