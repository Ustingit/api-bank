<template>
    <Loader v-if="loading"  />
    <div v-else-if="api" >
        <p>Name: {{api.name}}</p>
        <p>License: {{ api.license }}</p>
        <p>Api cost: {{ apiCost }}</p>
        <p>Descprition: {{ api.description }}</p>
        <p>Additional access rules: {{ api.additionalAccessRules }}</p>
        <b-button @click="deleteItem" variant="danger">Удалить данное API</b-button>
    </div>
    <p v-else >There is an issue with API representing, please try another one!</p>
</template>

<script>
import Loader from '../components/common/Loaders/Loader'

export default {
    name: 'Details',
    components: { Loader },
    data: () => ({
        loading: true,
        api: null
    }),
    mounted() {
        this.api = this.$store.getters.getApiById(this.$route.params.id);
        this.loading = false;
    },
    methods: {
        async deleteItem() {
            await this.$store.dispatch('deleteApi', this.api.id);
            this.$router.push("/");
        }
    },
    computed: {
        apiCost: function() {
            return this.api.isFree 
                    ? 'free' 
                    : this.api.accessCost && this.api.accessCost > 0 && this.api.monthlyCost && this.api.monthlyCost > 0
                      ? `${this.api.accessCost} $ for initial access. And then ${this.api.monthlyCost} $ every month` 
                      : this.api.accessCost && this.api.accessCost > 0
                        ? `${this.api.accessCost} $ for initial access` 
                        : this.api.monthlyCost && this.api.monthlyCost > 0 
                            ? `${this.api.monthlyCost} $ every month` 
                            : "0 $";
        }
    }
}
</script>