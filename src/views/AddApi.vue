<template>
    <div>
        <form @submit.prevent="onSubmit" >
            <input type="text" v-model.trim="name" placeholder="Введите название API" >
            <input type="checkbox" v-model="isFree" >
            <input v-if="!isFree" type="text" v-model.number="cost" placeholder="Введите стоимость доступа\использования API" >
            <button type="submit" >Сохранить</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'addAPI',
    data: () => ({
        name: '',
        isFree: true,
        cost: 0
    }),
    methods: {
        async onSubmit(){
            await this.$store.dispatch('addApi', {
                name: this.name,
                isFree: this.isFree,
                cost: this.cost
            })

            this.name = ''
            this.isFree = true
            this.cost = 0

            this.$router.push('/')
        }
    }
}
</script>