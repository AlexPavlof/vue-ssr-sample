/* eslint-disable consistent-return,prefer-promise-reject-errors,no-console */
import { createApp } from './app';

/**
 * Эта функция будет вызвана в `bundleRenderer`.
 * Выполняет загрузку данных, устаналавливает их в state перед рендерингом.
 * Так как загрузка данных выполняется асинхронно, возвращает промис, который
 * разрешается в экземпляр приложения.
 *
 * @param  {Object}       context
 * @return {Promise<any>}
 */
export default context => new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    const { url }                = context;
    const { fullPath }           = router.resolve(url).route;

    if (fullPath !== url) {
        return reject({ url: fullPath });
    }

    router.push(url);

    router.onReady(() => {
        /**
         * Компоненты, соответствующие текущему роуту.
         *
         * @type Array<Object>
         */
        const matchedComponents = router.getMatchedComponents();

        if (!matchedComponents.length) {
            return reject({ code: 404 });
        }

        Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
            store,
            route: router.currentRoute,
        }))).then(() => {
            context.state = store.state;

            resolve(app);
        }).catch(reject);
    }, reject);
});
