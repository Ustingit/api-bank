import { RU } from './languages/langageSettings'

export default {
    state: {
        language: RU
    },
    getters: {
        language: state => state.language
    },
    mutations: {
        setLanguage(state, newLanguage) {
            state.language = newLanguage;
        }
    }
}