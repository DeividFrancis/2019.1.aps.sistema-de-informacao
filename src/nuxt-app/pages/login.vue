<template>
<v-app id="inspire">
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Entrar</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-alert v-if="erro.msg" class="mt-0" value="true" type="error">
                            {{erro.msg}}
                        </v-alert>
                        <v-card-text>
                            <v-form>
                                <v-text-field prepend-icon="person" v-model="cpfCnpj" label="Cpf/ Cnpj" type="text" name="usuario"></v-text-field>
                                <v-text-field prepend-icon="lock" v-model="senha" label="Senha" type="password" name="senha"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary">Criar conta</v-btn>
                            <v-btn color="primary" @click="onLogin">Entrar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</v-app>
</template>

<script>
import agrobov from '~/webserver/agrobov/index';

const Cookie = process.client ? require('js-cookie') : undefined

export default {
    layout: 'empty',
    middleware: 'notAuthenticated',
    data: () => ({
        erro: {
            msg: null
        },
        drawer: null,
        cpfCnpj: '123.123.123-15',
        senha: 'segredo'
    }),
    props: {
        source: String
    },
    methods: {
        async onLogin() {
            const response = await agrobov.pessoa.auth_login(this.cpfCnpj, this.senha);
            if(response.status === "Error"){
                this.erro.msg = response.data
            }else{
                const token = 'Bearer ' + response.access_token
                this.$store.commit('auth/SET_TOKEN', token)
                Cookie.set('auth', token) // Token no servidor
                this.erro.msg = null
                this.$router.push('/')
            }
        }
    }

}
</script>
