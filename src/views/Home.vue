<template>
  <div>
    <p v-if="!filter && !allApisManaged.length" >Нет доступных API!</p>
    <p v-else-if="filter && !allApisManaged.length" >Нет доступных API по фильтру "{{ filter }}"" !</p>
    <ApiList
      v-else
      :key="allApisManaged.length"
      v-bind:apis="allApisManaged"
     />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiList from '../components/Apis/ApiList'

export default {
  name: 'Home',
  data: () => ({
    filter: ''
  }),
  async mounted(){
    await this.$store.dispatch('fetchApis', 1);
  },
  computed: {
    ...mapGetters(['allApis']),
    allApisManaged: function() {
      var filterValue = this.$route.query.filter;

      if (!filterValue) {
        this.filter = ''
        return this.allApis;
      }

      this.filter = filterValue;
      var filteredResult = this.allApis.filter(x => x.name.includes(filterValue)  || x.description.includes(filterValue));
      if (filteredResult.length > 0) {
        this.$store.commit('saveLastSucceedFilter', filterValue);       
      }
      
      return filteredResult;
    }
  },
  components: {
    ApiList
  }
}
</script>
