<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>API {{api}}</h1>
      <h1>AgroBosv2</h1>
      <mk-hello/>
    </v-flex>
  </v-layout>
</template>

<script>
import agrobov from '~/webserver/agrobov'

export default {
  middleware: 'authenticated',
  async asyncData({ app, params, store }) {
    return {
      api: await agrobov.pessoa.auth(store.state.auth.token).list()
    }
  },
  methods: {
  }
}
</script>
