const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        login: './src/login.test.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
        filename: '[name].bundle.js',
    },
    module: {
        rules: [{test: /\.js$/, use: 'babel-loader'}],
    },
    stats: {
        colors: true
    },
    target: 'web',
    externals: /k6(\/.*)?/,
    devtool: 'source-map'
};
