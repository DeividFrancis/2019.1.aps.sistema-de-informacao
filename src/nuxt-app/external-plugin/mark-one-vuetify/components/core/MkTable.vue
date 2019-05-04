<template>
<div class="elevation-1">
    <v-toolbar flat color="white">
        <v-toolbar-title>Animais</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
                <v-btn color="secondary" dark class="mb-2" v-on="on">Novo</v-btn>
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Formulario</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-btn icon large @click="close" target="_blank" v-on="on">
                                <v-icon large>close</v-icon>
                            </v-btn>
                        </template>
                        <span>Fechar</span>
                    </v-tooltip>
                </v-toolbar>
                <v-progress-linear :indeterminate="loading" color="secondary" class="mt-0 mb-0"></v-progress-linear>
                <v-alert :value="erro.msg" type="error" class="mt-0">{{erro.msg}}</v-alert>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field v-model="editedItem.descricao" label="Descrição"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field v-model="editedItem.codigo" label="Código"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="editedItem.nascimentoFormated" label="Nascimento" prepend-icon="event" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="editedItem.nascimento" locale="LF" @input="editedItem.nascimentoFormated = formatDate(editedItem.nascimento), menu2 = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs12>
                                <v-radio-group row v-model="editedItem.sexo">
                                    <v-radio color="blue" label="Macho" value="M"></v-radio>
                                    <v-radio color="pink" label="Femea" value="F"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex xs-12>
                                <v-textarea name="observacao" label="Observação" v-model="editedItem.observacao"></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error darken-1" flat :disabled="loading" @click="close">Cancelar</v-btn>
                    <v-btn color="success darken-1" flat :disabled="loading" @click="save">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-toolbar>
    <v-data-table 
    :headers="headers" 
    :items="desserts"
    rows-per-page-text="Items por página"
    hide-actions="true"
    >
        <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.descricao }}</td>
            <td class="text-xs-right">{{ props.item.codigo }}</td>
            <td class="text-xs-right">{{ props.item.nascimentoFormated}}</td>
            <td class="text-xs-right">{{ props.item.sexo }}</td>
            <td class="justify-center layout px-0">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn flat icon color="info" @click="editItem(props.item)" v-on="on">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <span>Alterar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn flat icon color="error" @click="deleteItem(props.item)" v-on="on">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Deletar</span>
                </v-tooltip>
            </td>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</div>
</template>

<script>
import moment from 'moment'

import agrobov from '~/webserver/agrobov/index'

export default {
    data: () => ({
        // Validador
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        },
        // Erros do dialog
        erro: {
            msg: null
        },

        // E da datapicker
        menu: false,
        modal: false,
        menu2: false,

        // Data Table
        dialog: false,
        headers: [{
                text: '#',
                align: 'left',
                value: 'id'
            },
            {
                text: 'Descrição',
                align: 'right',
                value: 'descricao'
            },
            {
                text: 'Código',
                align: 'right',
                value: 'codigo'
            },
            {
                text: 'Nascimento',
                align: 'right',
                value: 'nascimento'
            },
            {
                text: 'Sexo',
                align: 'right',
                value: 'sexo'
            },
            {
                text: 'Actions',
                value: 'name',
                align: 'center',
                sortable: false
            }
        ],
        desserts: [],
        loading: false,
        editedIndex: -1,
        editedItem: {
            id: 0,
            descricao: '',
            codigo: '',
            nascimento: '',
            sexo: ''
        },
        defaultItem: {
            id: 0,
            descricao: '',
            codigo: '',
            nascimento: '',
            sexo: ''
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Novo' : 'Alterar'
        },
        dateFormat(date) {
            return moment(date).format('DD/MM/YYYY')
        }
    },

    watch: {
        dialog(val) {
            val || this.close()
        }
    },

    created() {
        this.initialize()
    },

    methods: {
         formTitle() {
            return this.editedIndex === -1 ? 'Novo' : 'Alterar'
        },
        async initialize() {
            const res = await agrobov.animal.list()
            this.desserts = res.map(item => {
                item.nascimentoFormated = this.formatDate(item.nascimento)
                return item
            })
        },
        parseDate(date) {
            if (!date) return null
            return moment(date)
        },
        formatDate(date) {
            if (!date) return null
            return moment(date).format('DD/MM/YYYY')
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') &&
                this.desserts.splice(index, 1)
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
            this.erro.msg = null
        },

        async save() {
            this.loading = true
            try {
                if (this.editedIndex > -1) {
                    const animalUpdate = this.editedItem;
                    const res = await agrobov.animal.update(animalUpdate.id, animalUpdate)
                    Object.assign(this.desserts[this.editedIndex], res)
                } else {
                    const res = await agrobov.animal.create(this.editedItem)
                    this.desserts.push(res.data)
                }
                this.close()
            } catch (err) {
                console.error(err)
                this.erro.msg = err.message
            }finally{
                this.loading = false
            }
        }
    }
}
</script>
