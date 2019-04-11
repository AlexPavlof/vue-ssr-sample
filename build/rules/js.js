/**
 * Загрузчик скриптов через Babel.
 *
 * @see https://github.com/babel/babel-loader
 */
export default {
    test:    /\.js$/,
    exclude: /node_modules/,
    use:     [{
        loader:  'babel-loader',
        options: {
            cacheDirectory: true,
        },
    }, {
        loader: 'eslint-loader',
    }],

};
