import Vue from 'vue';
import Vuex from 'vuex';

export default {
    //user { id: '', name: '', fio: '', email: '' }
    state: {
        user: null
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        isLoggedIn(state) {
            return state != null && state.name;
        }
    }
}