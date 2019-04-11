import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { isProduction }     from '../mode';

const use = [
    'css-loader',
    'postcss-loader',
    'less-loader',
];

if (isProduction) {
    use.unshift(MiniCssExtractPlugin.loader);
} else {
    use.unshift('vue-style-loader');
}

/**
 * Загрузчик стилей.
 *
 * @see https://github.com/webpack-contrib/less-loader
 * @see https://github.com/webpack-contrib/mini-css-extract-plugin
 */
export default {
    test: /\.(le|c)ss$/,
    use,
};
