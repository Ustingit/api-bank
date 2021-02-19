import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import UserStore from './user'
import PaginationStore from './pagination'
import SettingsStore from './settings'

Vue.use(Vuex)

const apiUrl = 'https://localhost:44363/ExternalApi/';

export default new Vuex.Store({
  state: {
    allApis: [],
    lastSuccessfullFilter: '',
    currentFilter: null
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
    async fetchApis({commit}, urlData){
      fetch(apiUrl + getFetchingUrlByData(urlData)).then(response => {
        if (response.status === 200) {
          response.json().then(json => {
            if (json.succeed) {
              commit('setApis', json.data.items);
              commit('setPaginationInfo', json.data)
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
    UserStore, PaginationStore, SettingsStore
  },
  getters: {
    allApis(state) {
      return state.allApis
    },
    getApiById: (state) => (id) => {
      return state.allApis.find(api => api.id === id)
    },
    hasNoItemsAndFilterIsEmpty(state) {
      return !state.currentFilter && !state.allApis.length
    },
    hasNoItemsForFilter(state) {
      return state.currentFilter && !state.allApis.length
    },
    currentFilter(state) {
      return state.currentFilter ?? null
    }
  }
})

var getFetchingUrlByData = function(urlData) {
  return urlData.filter 
          ? `GetApis?page=${urlData.page}&size=${urlData.perPage}&filter=${urlData.filter}` 
          : `GetApis?page=${urlData.page}&size=${urlData.perPage}`; 
}