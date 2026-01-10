const path = require('path');
const { merge } = require('webpack-merge');

module.exports = merge(require('./webpack.base'), {
    mode: 'production',
    context: __dirname,

    entry: {
        'index': './src/index.ts',
        'index.min': './src/index.ts',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: {
            name: 'vlightbox',
            type: 'umd',
            export: 'default',
        },
        globalObject: 'this',
    },

    externals: {
        vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'Vue'
        }
    },

    optimization: {
        minimize: true,
        minimizer: [
            (compiler) => {
                const TerserPlugin = require('terser-webpack-plugin');
                new TerserPlugin({
                    test: /\.min\.js$/,
                    terserOptions: {
                        compress: true,
                        mangle: true,
                    },
                }).apply(compiler);
            },
        ],
    },
});