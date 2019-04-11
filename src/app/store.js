import Vue    from 'vue';
import Vuex   from 'vuex';
import cities from './store/modules/cities';

Vue.use(Vuex);

export default () => new Vuex.Store({
    modules: {
        cities,
    },
});
