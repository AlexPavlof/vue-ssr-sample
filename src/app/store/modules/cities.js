import cities from './cities.json';

export default {
    namespaced: true,
    state:      () => ({
        cities:  {},
        city:    {},
        loading: false,
    }),
    actions: {
        /**
         * Имитация запроса списка городов на сервере.
         */
        async fetchData({ commit }) {
            const timeout = ms => new Promise(resolve => setTimeout(() => resolve(cities), ms));

            commit('setLoading', true);
            commit('setCities', await timeout(2000));
            commit('setLoading', false);
        },

        /**
         * Имитация запроса города на сервере.
         */
        async getCurrent({ commit }, { city }) {
            const timeout = ms => new Promise(resolve => setTimeout(() => resolve(cities[city]), ms));

            commit('setLoading', true);
            commit('setCity', Object.assign(await timeout(2000), { key: city }));
            commit('setLoading', false);
        },
    },
    mutations: {
        setCities(state, data) {
            state.cities = data;
        },
        setCity(state, city) {
            state.city = city;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
    },
};
