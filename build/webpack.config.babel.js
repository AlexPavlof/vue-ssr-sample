/* eslint-disable no-console */
import { resolve }            from 'path';
import { mode, isProduction } from './mode';
import rules                  from './rules';
import VueLoaderPlugin        from './plugins/vue-loader';

export default {
    mode,
    context: resolve(__dirname, '../src'),
    output:  {
        path:       resolve(__dirname, '../dist/'),
        publicPath: '/dist/',
    },
    target:  'web',
    cache:   true,
    plugins: [
        VueLoaderPlugin,
    ],
    module: {
        rules,
    },
    performance: {
        hints: isProduction ? false : 'warning',
    },
    devtool: isProduction ? 'none' : 'source-map',
    resolve: {
        modules: ['node_modules'],
    },
};
