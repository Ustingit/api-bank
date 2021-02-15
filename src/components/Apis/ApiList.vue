<template>
<div class="container-fluid">
  <div v-for="(rowApis, index) in groupedApis" :key="index" class="row">
    <b-card-group deck class="mt-3">
    <b-card
        border-variant="secondary"
        :header="api.name | shortener"
        header-border-variant="secondary"
        align="center"
        :footer="getApiCost(api)"
        footer-tag="footer"
        v-for="api in rowApis" 
        :key="api.id" 
        class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
      >
        <b-card-text>{{ api.description | shortener(100) }}</b-card-text>
        <b-button @click="$router.push(`/details/${api.id}`)" >Детали</b-button>
      </b-card> 
    </b-card-group>
  </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'ApiList',
    props: ['apis'],
    methods: {
        getApiCost(api) {
            return api.isFree 
                    ? 'free' 
                    : api.accessCost 
                      ? `${api.accessCost} $` 
                      : api.monthlyCost 
                        ? `${api.monthlyCost} $ monthly` 
                        : 'free';
        }
    },
    computed: {
      groupedApis() {
        return _.chunk(this.apis, 3);
      }
    }
}
</script>
