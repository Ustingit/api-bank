import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// api example  { id: 1, name: '', description: '', methodTitles: [], methods: [] }

export default new Vuex.Store({
  state: {
    allApis: [],
    queryForMainPage: null
  },
  mutations: {
    addApi(state, newApiItem) {
      state.allApis.push(newApiItem)
    },
    addMainPageFilter(state, query) {
      console.log('in mutation, current val = ', state.queryForMainPage, ' , next = ', query)
      state.queryForMainPage = query
    }
  },
  actions: {
    async addApi({commit}, api) {
      api.id = new Date().toJSON();
      commit('addApi', api)
    }
  },
  modules: {
  },
  getters: {
    allApis(state) {
      if (!state.queryForMainPage) {
        return state.allApis
      }
      
      return state.allApis.filter(x => x.name === state.queryForMainPage 
        || x.description === state.queryForMainPage 
        || x.methodTitles.contains(state.queryForMainPage))
    }
  }
})
