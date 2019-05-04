/* eslint-disable */
<template>
<v-layout column>
    <v-layout row>
    </v-layout>
    <mk-table-crud title="Cliente/ Fornecedor" :data-table="dataTable">
        <template v-slot:many>
            <pessoa-form-create/>
        </template>
        <template v-slot:one>
            <pessoa-form-create/>
        </template>
    </mk-table-crud>
</v-layout>
</template>

<script>
import PessoaFormCreate from '~/components/pessoa/PessoaFormCreate'

import agrobov from '~/webserver/agrobov/index'

export default {
     middleware: 'authenticated',
    components:{
        PessoaFormCreate
    },
    asyncData: async ({ app, params, store }) => ({
        dataTable: {
            headers: [
                {
                    text: '#',
                    value: 'id'
                },
                {
                    text: 'Nome Razão',
                    value: 'nomerazao'
                },
                {
                    text: 'Fantasia',
                    value: 'apelidofantasia'
                },
                {
                    text: 'Telefone',
                    value: 'telefone1'
                },
                {
                    text: 'Cpf/Cnpj',
                    value: 'cpfCnpj'
                },
                {
                    text: 'Email',
                    value: 'email1'
                },
            ],
            rows: await agrobov.pessoa.auth(store.state.auth.token).list()
        }
    }),
    data: () => ({})
}
</script>

