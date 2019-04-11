import webpack                 from 'webpack';
import merge                   from 'webpack-merge';
import SWPrecachePlugin        from 'sw-precache-webpack-plugin';
import VueSSRClientPlugin      from 'vue-server-renderer/client-plugin';
import UglifyJsPlugin          from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import baseConfig              from './webpack.config.babel';
import { mode, isProduction }  from './mode';
import PluginExtract           from './plugins/extract';

const optimization = {
    splitChunks: {
        cacheGroups: {
            vendor: {
                test:     /[\\/]node_modules[\\/]/,
                chunks:   'all',
                name:     'vendor',
                priority: 1,
                enforce:  true,
            },
        },
    },
    runtimeChunk: {
        name: 'manifest',
    },
};

if (isProduction) {
    optimization.minimizer = [
        new UglifyJsPlugin({
            cache:         true,
            parallel:      true,
            sourceMap:     !isProduction,
            uglifyOptions: {
                output: {
                    comments: false,
                },
            },
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
        }),
    ];
}

const config = merge(baseConfig, {
    entry: {
        app: './entry-client.js',
    },
    output: {
        filename: 'js/[name].[contenthash:10].js',
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
            'process.env.VUE_ENV':  '"client"',
        }),
        new VueSSRClientPlugin(),
    ],
    optimization,
});

if (isProduction) {
    config.plugins.push(PluginExtract);
    config.plugins.push(
        // auto generate service worker
        new SWPrecachePlugin({
            cacheId:                       'vue-hn',
            filename:                      'service-worker.js',
            minify:                        true,
            dontCacheBustUrlsMatching:     /./,
            staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
            runtimeCaching:                [
                {
                    urlPattern: '/',
                    handler:    'networkFirst',
                },
            ],
        }),
    );
}

export default config;
