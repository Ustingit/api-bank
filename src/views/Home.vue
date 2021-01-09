<template>
  <div>
    <p v-if="!allApis.length" >Нет доступных API!</p>
    <ApiList
      v-else
      :key="allApis.length"
      v-bind:apis="allApis"
     />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiList from '../components/Apis/ApiList'

export default {
  name: 'Home',
  computed: mapGetters(['allApis']),
  components: {
    ApiList
  }
}
</script>
