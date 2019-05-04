import api from '../api.config'

const pessoa = {
  auth: function(token) {
    Object.assign(api.defaults, {
      headers: { Authorization: token, 'Content-Type': 'application/json' }
    })
    return this
  },
  auth_login: async (cpfCnpj, senha) => {
    try {
      const response = await api.post('/auth/login', {
        cpfCnpj: cpfCnpj,
        senha: senha
      })
      return response.data
    } catch (e) {
      return e.response.data
    }
  },
  list: async () => {
    const response = await api.get('/pessoa')
    return response.data.data
  }
}
export default pessoa
