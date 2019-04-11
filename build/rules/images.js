/**
 * Загрузчик изображений.
 *
 * @see https://github.com/webpack-contrib/url-loader
 */
export default {
    test: /(img\/|node_modules\/).*?\.(jpe?g|png|gif|svg)/,
    use:  [{
        loader:  'url-loader',
        options: {
            name:       '[name].[ext]',
            outputPath: 'images/',
            publicPath: '../images/',
            limit:      10000,
        },
    }],
};
