
/**
 * Импорт файлов .vue.
 *
 * @see https://github.com/vuejs/vue-loader
 */
export default {
    test:    /\.vue$/,
    loader:  'vue-loader',
    options: {
        extractCSS: true,
        loaders:    {
            js: 'babel-loader',
        },
    },
};
