<template>
    <div>
  <div class="mt-3">
    <b-card-group deck>

      <b-card
        border-variant="secondary"
        :header="api.name"
        header-border-variant="secondary"
        align="center"
        :footer="getApiCost(api)"
        footer-tag="footer"
        v-for="api in apis"
        :key="api.id"
      >
        <b-card-text>{{ api.description }}</b-card-text>
      </b-card>

    </b-card-group>
  </div>
</div>
</template>

<script>
export default {
    name: 'ApiList',
    props: ['apis'],
    methods: {
        getApiCost(api) {
            return !api.isFree ? `${api.cost} $` : 'free';
        }
    }
}
</script>