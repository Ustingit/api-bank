<template>
  <Loader v-if="loading" />
  <ApiList v-else />
</template>

<script>
import { mapGetters } from 'vuex'
import ApiList from '../components/Apis/ApiList'
import Loader from '../components/common/Loaders/Loader'

export default {
  name: 'Home',
  data: () => ({
    filter: '',
    loading: true
  }),
  async mounted(){
    var filterValue = this.$route.query.filter ?? null;
    await this.$store.dispatch('fetchApis', { page: 1, perPage: this.countOfItemsOnPage, filter: filterValue });
    this.loading = false;
  },
  computed: {
    ...mapGetters(['countOfItemsOnPage'])
  },
  components: {
    ApiList, Loader
  }
}
</script>
