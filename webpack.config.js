const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    externals: {
        ymaps3: 'ymaps3'
    },
    devtool: 'cheap-source-map'
};