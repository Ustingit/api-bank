<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/" >{{ 'MainTitle' | localizer }}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/addApi" >{{ 'AddAPI' | localizer }}</b-nav-item>
        <b-nav-item to="/about" >{{ 'About' | localizer }}</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" :placeholder="this.$options.filters.localizer('Search')" v-model.trim="filterValue" ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" @click.prevent="onSearch" >{{ 'Find' | localizer }}</b-button>
        </b-nav-form>

        <div>
          <b-form-select v-model="language" :options="languageOptions" size="sm" class="mt-1 ml-1" @change="onLanguageChange" ></b-form-select>
        </div>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{ 'User' | localizer }}</em>
          </template>
          <b-dropdown-item href="#">{{ 'ProfileTitle' | localizer }}</b-dropdown-item>
          <b-dropdown-item href="#">{{ 'LogOutLong' | localizer }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { RU, EN } from '@/store/languages/langageSettings'

export default {
    name: 'MainNavBar',
    data: () => ({
        filterValue: '',
        language: null,
        languageOptions: [
          { value: RU, text: 'Русский' },
          { value: EN, text: 'English' }
        ]
    }),
    mounted() {
      this.language = this.$store.getters.language;
    },
    methods: {
        async onSearch() {
            if (this.filterValue) {
                this.$router.push({
                  path: '/search/' + this.filterValue,
                  query: {
                    time: new Date().getTime(), //little approach to track changes due to https://stackoverflow.com/a/62125496/6935910
                  }});
            }
        },
        onLanguageChange(newLanguage) {
          this.$store.commit('setLanguage', newLanguage)
        }
    }    
}

</script>
<style scoped>
    .no-decor {
    text-decoration: none;
}
</style>