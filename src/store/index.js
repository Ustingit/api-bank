import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import UserStore from './user'

Vue.use(Vuex)

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
    },
    deleteApi(state, id) {
      state.allApis = state.allApis.filter(x => x.id !== id);
    }
  },
  actions: {
    async addApi({commit}, api) {
      await fetch(apiUrl + 'Create', {
        method: 'POST',
        body: JSON.stringify(api),
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (response.status === 200) {
          response.json().then(json => {
            if (json.succeed) {
              commit('addApi', api)
            }
          })
        } 
      })
    },
    async fetchApis({commit}, page, size = 10){
      fetch(apiUrl + `GetApis?page=${page}&size=${size}`).then(response => {
        if (response.status === 200) {
          response.json().then(json => {
            if (json.succeed) {
              commit('setApis', json.data);
            }
          })
        }
      })
    },
    async deleteApi({commit}, id) {
      await axios.delete(apiUrl + `Delete?id=${id}`).then(response => {
        if (response.status === 200) {
          if (response.data.succeed) {
            commit('deleteApi', id);
          }
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
    },
    getApiById: (state) => (id) => {
      return state.allApis.find(api => api.id === id)
    }
  }
})
