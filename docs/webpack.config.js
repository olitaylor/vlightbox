const path = require('path');
const { merge } = require('webpack-merge');

module.exports = merge(require('../webpack.base'), {
    mode: 'development',
    context: path.resolve(__dirname, '..'),

    entry: './src/index.ts',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        library: {
            name: 'vlightbox',
            type: 'umd',
        },
    },

    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        compress: true,
        port: 8080,
        hot: true,
        open: true,
    },
});
