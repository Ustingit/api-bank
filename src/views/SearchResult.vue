<template>
    <Loader v-if="loading" />
    <div v-else >
        <p>Results for query: {{ filter }}</p>
        <ApiList />
    </div>    
</template>

<script>
import ApiList from '../components/Apis/ApiList'
import Loader from '../components/common/Loaders/Loader'

export default {
    name: 'SearchResult',
    data: () => ({
        filter: '',
        loading: true
    }),
    watch: {
        '$route.params.filter': function (filter) {
            this.fetchFilteredData(filter)
        }
    },
    async mounted() {
        var filterValue = this.$route.params.filter;
        if (filterValue) {
            await this.fetchFilteredData(filterValue);
        } else {
            this.$route.push('/')
        }
    },
    methods: {
        async fetchFilteredData(filterValue) {
            await this.$store.dispatch('fetchApis', { page: 1, perPage: this.countOfItemsOnPage, filter: filterValue });
            this.filter = filterValue;
            this.loading = false;
        }
    },
    components: {
        ApiList, Loader
    }
}
</script>