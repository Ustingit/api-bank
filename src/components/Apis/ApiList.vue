<template>
<p v-if="hasNoItemsAndFilterIsEmpty" >Нет доступных API!</p>
<p v-else-if="hasNoItemsForFilter" >Нет доступных API по фильтру "{{ currentFilter }}"" !</p>
<div class="container-fluid" v-else >
  <div v-for="(rowApis, index) in apis" :key="index" class="row" id="api-grid" >
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
  <b-pagination
      class="mt-3"
      align="center"
      v-model="pageNumber"
      :total-rows="totalCount"
      :per-page="countOfItemsOnPage"
      aria-controls="api-grid"
      @input="handlePaginationChange"
    ></b-pagination>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapState } from 'vuex';

export default {
    name: 'ApiList',
    data: () => ({
      pageNumber: 1,
      apis: []
    }),
    mounted() {
      this.pageNumber = this.$store.getters.currentPage;
      this.apis = this.getGroupedApis(this.allApis);
    },
    methods: {
        getApiCost(api) {
            return api.isFree 
                    ? 'free' 
                    : api.accessCost 
                      ? `${api.accessCost} $` 
                      : api.monthlyCost 
                        ? `${api.monthlyCost} $ monthly` 
                        : 'free';
        },
        async handlePaginationChange(newPageNumber) {
          await this.$store.dispatch('fetchApis', { page: newPageNumber, perPage: this.countOfItemsOnPage, filter: this.currentFilter })
          this.pageNumber = newPageNumber;
        },
        getGroupedApis(apis) {
          return _.chunk(apis, 3);
        }
    },
    computed: {
      ...mapGetters(['countOfItemsOnPage', 'totalCount', 'hasNoItemsAndFilterIsEmpty', 'hasNoItemsForFilter', 'currentFilter']),
      ...mapState(['allApis'])
    },
    watch: {
      allApis(newValue, oldValue) {
        this.apis = this.getGroupedApis(newValue)
      }
    }
}
</script>
