import en from '../store/languages/en.json'
import ru from '../store/languages/ru.json'
import store from '../store/index'
import { RU, EN } from '../store/languages/langageSettings'

const translations = {
    [RU]: ru,
    [EN]: en
}

export default function localizerFilter(key) {
    const locale = store.getters.language || RU;

    return translations[locale][key] || `[Localize error]: key ${key} not found`
}