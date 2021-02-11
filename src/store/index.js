import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import UserStore from './user'

Vue.use(Vuex)

// api example  { id: 1, name: '', description: '', methodTitles: [], methods: [] }

const apiUrl = 'https://localhost:44363/ExternalApi/';

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
    },
    setApis(state, apis) {
      state.allApis = apis;
    }
  },
  actions: {
    async addApi({commit}, api) {
      api.id = new Date().toJSON();
      commit('addApi', api)
    },
    async fetchApis({commit}, page, size = 10){
      var apis = fetch(apiUrl + `GetApis?page=${page}&size=${size}`).then(response => {
        if (response.status === 200) {
          response.json().then(json => {
            if (json.succeed) {
              console.log(json.data);
              commit('setApis', json.data);
            }
          })
        }
      })
    }
  },
  modules: {
    UserStore
  },
  getters: {
    allApis(state) {
      return state.allApis
    }
  }
})
