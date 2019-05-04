<template>
<mk-action-form @save="save" :error="error">
    <v-layout wrap>
        <v-flex xs12>
            <v-text-field v-model="pessoa.nomerazao" label="Nome razão"></v-text-field>
        </v-flex>
        <v-flex xs6>
            <v-text-field v-model="pessoa.fantasia" label="Fantasia"></v-text-field>
        </v-flex>
        <v-flex xs6>
            <v-text-field v-model="pessoa.cpfCnpj" label="CpfCnpj"></v-text-field>
        </v-flex>
    </v-layout>
</mk-action-form>
</template>

<script>
export default {
    props: {
        dialog: {
            default: false
        },
        loading: {
            default: true
        }
    },
    data: () => ({
        pessoa: {
            nomerazao: '',
            fantasia: '',
            telefone: '',
            cpfCnpj: '',
            email: ''

        },
        error: null
    }),
    methods: {
        async save() {
            // this.loading = true
            try {
                // if (this.editedIndex > -1) {
                //     const animalUpdate = this.editedItem;
                //     const res = await agrobov.animal.update(animalUpdate.id, animalUpdate)
                //     Object.assign(this.desserts[this.editedIndex], res)
                // } else {
                //     const res = await agrobov.animal.create(this.editedItem)
                //     this.desserts.push(res.data)
                // }
                setTimeout(() => {
                    console.log("Simular save")
                    const actionForm = this.$children.find(component => component.$options.name === "MkActionForm");
                    actionForm.close()
                }, 3000);
            } catch (err) {
                console.error(err)
                this.msg = err.message
            } finally {
                // this.loading = false
            }
        }
    }
}
</script>
