import { resolve }        from 'path';
import merge              from 'webpack-merge';
import nodeExternals      from 'webpack-node-externals';
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin';
import baseConfig         from './webpack.config.babel';
import { isProduction }   from './mode';
import PluginExtract      from './plugins/extract';

const config = merge(baseConfig, {
    context: resolve(__dirname, '../src'),
    entry:   './entry-server.js',
    target:  'node',
    output:  {
        filename:      'vue-ssr-server-bundle.js',
        publicPath:    '/dist/',
        libraryTarget: 'commonjs2',
    },
    externals: nodeExternals({
        whitelist: /\.css$/,
    }),
});

config.plugins.push(new VueSSRServerPlugin());

if (isProduction) {
    config.plugins.push(PluginExtract);
}

export default config;
