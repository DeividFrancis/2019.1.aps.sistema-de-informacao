<template>
<div class="elevation-1">
    <v-toolbar flat color="white">
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <slot name="many"></slot>
    </v-toolbar>
    <v-data-table :headers="dataTable.headers" :items="dataTable.rows" rows-per-page-text="Items por página" :hide-actions="true">
        <template v-slot:items="props">
            <td v-for="head in dataTable.headers" :key="head.value">{{ props.item[head.value]}}</td>
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
    props: [
        'title',
        'dataTable'
    ],
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
        loading: false,
        editedIndex: -1,
        editedItem: {},
    }),

    computed: {
        dateFormat(date) {
            return moment(date).format('DD/MM/YYYY')
        }
    },

    watch: {
        dialog(val) {
            val || this.close()
        }
    },
    methods: {
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

       
    }
}
</script>
