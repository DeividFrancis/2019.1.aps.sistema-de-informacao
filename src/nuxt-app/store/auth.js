// const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  token: null
})
export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}

// export const getters = {
//   token: store => store.token
// }

// export const actions = {
// nuxtServerInit({ commit }, { req }) {
//   let auth = null
//   if (req.headers.cookie) {
//     const parsed = cookieparser.parse(req.headers.cookie)
//     try {
//       auth = JSON.parse(parsed.auth)
//     } catch (err) {
//       // No valid cookie found
//     }
//   }
//   commit('setAuth', auth)
// }
//   addToken({ dispatch }, token) {
//     dispatch('SET_TOKEN', token)
//   }
// }
