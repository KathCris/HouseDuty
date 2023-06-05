export const state = () => ({
  teste: false,
  statePage: ''
})

export const mutations = {
  teste (state) {
    state.teste = !state.teste
  },

  changeStatePage (state, payload) {
    state.statePage = payload
  }

}

export const actions = {
  ActionTeste (context) {
    context.commit('teste')
  }
}
