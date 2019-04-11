import Vue          from 'vue';
import VueRouter    from 'vue-router';
import MainPage     from './components/pages/MainPage.vue';
import CityPage     from './components/pages/CityPage.vue';
import NotFoundPage from './components/pages/error/NotFoundPage.vue';

Vue.use(VueRouter);

/**
 * Отдельные маршруты, которые не будут использовать макет основной страницы.
 *
 * @type {Array}
 */
export const simpleRoutes = [
    {
        path:      '*',
        name:      '404',
        component: NotFoundPage,
        meta:      {
            title: 'Страница не найдена',
        },
    },
];

/**
 * Основные маршруты.
 *
 * @type {Array}
 */
export const routes = [{
    path:      '/',
    name:      'main',
    component: MainPage,
    meta:      {
        title: 'Главная',
    },
}, {
    path:      '/:city',
    name:      'city',
    component: CityPage,
    meta:      {
        title: '%s',
    },
}];

export default () => new VueRouter({
    mode:   'history',
    routes: routes.concat(simpleRoutes),

    /**
     * Вспомогательный метод, позволяющий сохранять позицию скролла
     * при переходе по страницам.
     */
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }

        return { x: 0, y: 0 };
    },
});
