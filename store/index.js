export const state = () => ({
  teste: false,
  statePage: '',
  qtdRules: 0
})

export const mutations = {
  teste (state) {
    state.teste = !state.teste
  },

  changeStatePage (state, payload) {
    state.statePage = payload
  },

  showQtdRules (state, payload) {
    state.qtdRules = payload
  }

}

export const actions = {
  ActionTeste (context) {
    context.commit('teste')
  }
}
