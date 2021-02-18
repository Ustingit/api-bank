export default {
    state: {
        countOfApisOnPage: 12,
        currentPage: 1,
        totalCount: 0
    },
    mutations: {
        setPaginationInfo(state, data) {
            state.currentPage = data.page;
            state.totalCount = data.total;
        }
    },
    getters: {
        countOfItemsOnPage(state) {
            return state.countOfApisOnPage;
        },
        totalCount(state) {
            return state.totalCount;
        },
        currentPage(state) {
            return state.currentPage;
        }
    }
}