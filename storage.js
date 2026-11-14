

/*
 NESÍ AI — MOTOR DE ARMAZENAMENTO
 Versão 1.0
 Gestão de registos históricos.
*/

const NesiStorage = {

  chave: "nesi_ai_registos",

  obterTodos() {
    try {
      const dados = localStorage.getItem(this.chave);
      return dados ? JSON.parse(dados) : [];
    } catch (erro) {
      return [];
    }
  },

  guardarTodos(registos) {
    try {
      localStorage.setItem(
        this.chave,
        JSON.stringify(registos)
      );
      return true;
    } catch (erro) {
      return false;
    }
  },

  adicionar(jogoId, resultado) {
    if (
      typeof NesiGames === "undefined" ||
      !NesiGames.validarResultado(jogoId, resultado)
    ) {
      return {
        sucesso: false,
        mensagem: "Jogo ou resultado inválido."
      };
    }

    const registos = this.obterTodos();

    const novoRegisto = {
      id: Date.now().toString(),
      jogo: jogoId,
      resultado,
      data: new Date().toISOString()
    };

    registos.push(novoRegisto);

    if (!this.guardarTodos(registos)) {
      return {
        sucesso: false,
        mensagem: "Não foi possível guardar o registo."
      };
    }

    return {
      sucesso: true,
      registo: novoRegisto
    };
  },

  listar(jogoId = null) {
    const registos = this.obterTodos();

    if (!jogoId) return registos;

    return registos.filter(
      registo => registo.jogo === jogoId
    );
  },

  remover(id) {
    const registos = this.obterTodos();

    const atualizados = registos.filter(
      registo => registo.id !== String(id)
    );

    if (atualizados.length === registos.length) {
      return false;
    }

    return this.guardarTodos(atualizados);
  },

  limpar(jogoId = null) {
    if (!jogoId) {
      return this.guardarTodos([]);
    }

    const restantes = this.obterTodos().filter(
      registo => registo.jogo !== jogoId
    );

    return this.guardarTodos(restantes);
  },

  exportar() {
    return JSON.stringify(
      this.obterTodos(),
      null,
      2
    );
  },

  importar(conteudo) {
    try {
      const dados = JSON.parse(conteudo);

      if (!Array.isArray(dados)) {
        return false;
      }

      const validos = dados.filter(registo =>
        registo &&
        typeof registo.id === "string" &&
        typeof registo.jogo === "string" &&
        typeof NesiGames !== "undefined" &&
        NesiGames.validarResultado(
          registo.jogo,
          registo.resultado
        )
      );

      return this.guardarTodos(validos);
    } catch (erro) {
      return false;
    }
  },

  total() {
    return this.obterTodos().length;
  }

};

if (typeof window !== "undefined") {
  window.NesiStorage = NesiStorage;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = NesiStorage;
}
