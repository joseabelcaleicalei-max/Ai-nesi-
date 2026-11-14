

/*
 NESÍ AI — MOTOR DE VALIDAÇÃO
 Versão 1.0
*/

const NesiValidator = {

  validar(dados) {
    if (!Array.isArray(dados)) {
      return {
        sucesso: false,
        mensagem: "O formato dos dados é inválido."
      };
    }

    const validos = dados.filter(valor =>
      typeof valor === "number" &&
      Number.isFinite(valor)
    );

    const invalidos = dados.length - validos.length;

    const repetidos = validos.filter(
      (valor, indice) => validos.indexOf(valor) !== indice
    );

    const unicos = [...new Set(validos)];

    return {
      sucesso: true,
      totalRecebido: dados.length,
      totalValido: validos.length,
      totalInvalido: invalidos,
      totalRepetido: repetidos.length,
      totalUnico: unicos.length,
      qualidade: this.classificar(
        dados.length,
        validos.length
      ),
      dadosLimpos: validos
    };
  },

  classificar(total, validos) {
    if (total === 0) return "SEM DADOS";

    const percentagem = (validos / total) * 100;

    if (percentagem === 100) return "EXCELENTE";
    if (percentagem >= 80) return "BOA";
    if (percentagem >= 50) return "MODERADA";

    return "BAIXA";
  }

};

if (typeof window !== "undefined") {
  window.NesiValidator = NesiValidator;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = NesiValidator;
}
