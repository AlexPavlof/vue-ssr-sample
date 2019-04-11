import 'core-js/modules/es.promise';
import 'core-js/modules/es.array.iterator';
import Vue          from 'vue';
import { sync }     from 'vuex-router-sync';
import createRouter from './app/router';
import createStore  from './app/store';
import App          from './app/components/App.vue';

export const createApp = () => {
    const router = createRouter();
    const store  = createStore();

    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: h => h(App),
    });

    return { app, router, store };
};

export default createApp;
