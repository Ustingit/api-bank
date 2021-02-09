import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// api example  { id: 1, name: '', description: '', methodTitles: [], methods: [] }

export default new Vuex.Store({
  state: {
    allApis: [],
    lastSuccessfullFilter: ''
  },
  mutations: {
    addApi(state, newApiItem) {
      state.allApis.push(newApiItem)
    },
    saveLastSucceedFilter(state, filter) {
      state.lastSuccessfullFilter = filter
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
      return state.allApis
    }
  }
})
