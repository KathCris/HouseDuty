export const state = () => ({
  teste: false
})

export const mutations = {
  teste (state) {
    state.teste = !state.teste
  }

}

export const actions = {
  ActionTeste (context) {
    context.commit('teste')
  }
}
