import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allApis: []
  },
  mutations: {
    addApi(state, newApiItem) {
      state.allApis.push(newApiItem)
    }
  },
  actions: {
    async addApi({commit}, api) {
      //var newApi = await save(api)
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
