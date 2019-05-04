import api from '~/webserver/agrobov/api.config.js'

const prefix = '/animal'

const animal = {
  auth: token => api.auth(token),
  list: async () => {
    const res = await api.get(prefix)
    return res.data.data
  },
  create: async item => {
    const animalUpdate = parseAnimal(item)
    const res = await api.post(prefix, animalUpdate)
    return res.data
  },
  get: async id => {
    const res = await api.get(prefix + id)
    return res.data.data
  },
  update: async (id, item) => {
    const animalUpdate = parseAnimal(item)

    let res = null
    try {
      res = await api.put(prefix + '/' + id, animalUpdate)
    } catch (err) {
      res = err.response
      let message = 'Ops! algo deu arrado'
      if (res.status === 422) {
        message = res.data.data.erros
      }
      throw Error(message)
    }
    return res.data.data
  }
}

export default animal
function parseAnimal(item) {
  return {
    descricao: item.descricao || '',
    codigo: item.codigo || '',
    nascimento: item.nascimento || '',
    sexo: item.sexo || '',
    observacao: item.observacao || ''
  }
}
