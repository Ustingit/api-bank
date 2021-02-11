<template>
    <Loader v-if="loading"  />
    <div v-else >
        <p>Id: {{api.id}}</p>
        <p>Name: {{api.name}}</p>
        <b-button @click="deleteItem" variant="danger">Удалить данное API</b-button>
    </div>
</template>

<script>
import Loader from '../components/common/Loaders/Loader.vue';

export default {
    name: 'Details',
    components: {
        Loader
    },
    data: () => ({
        loading: true,
        api: null
    }),
    mounted() {
        this.api = this.$store.getters.getApiById(this.$route.params.id);
        this.loading = false;
    },
    methods: {
        deleteItem() {
            this.$store.dispatch('deleteApi', this.api.id);
            this.$router.push("/");
        }
    }
}
</script>