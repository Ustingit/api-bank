<template>
  <div>
    <p v-if="!allApis.length" >Нет доступных API!</p>
    <ul v-else :key="allApis.length" >
      <li v-for="api in allApis" :key="api.id" >
        <p>{{ api.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: mapGetters(['allApis'])
}
</script>
