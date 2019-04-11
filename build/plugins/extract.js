import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { isProduction }     from '../mode';

/**
 * Плагин, выполняющий экспорт стилей в отдельные файлы.
 *
 * @type {MiniCssExtractPlugin}
 */
const PluginExtract = new MiniCssExtractPlugin({
    filename:      isProduction ? 'css/[name].[contenthash:10].css' : 'css/[name].css',
    chunkFilename: isProduction ? 'css/[name].[contenthash:10].css' : 'css/[name].css',
});

export default PluginExtract;
