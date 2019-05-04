<template>
<v-dialog :value="dialog" max-width="900px">
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
        <v-alert :value="error" type="error" class="mt-0">{{error}}</v-alert>
        <v-card-text>
            <v-container grid-list-md>
                <slot />
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat :disabled="loading" @click="close">Cancelar</v-btn>
            <v-btn color="success darken-1" flat :disabled="loading" @click="save">Salvar</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: {
        error:{ 
            default: null
        },
    },
    data: () => ({
        loading: false,
        dialog: false
    }),
    methods: {
        save(e) {
            this.loading= true
            this.$emit('save', e)
        },
        close() {
            this.dialog = false
            this.loading = false
        }
    }
}
</script>
