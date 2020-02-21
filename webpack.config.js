const path = require('path');
const webpack = require('webpack');
module.exports = {
    context: __dirname,
    entry: {
        mychart: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist/js',
        sourcePrefix: ''
    },
    optimization: {
        minimize: false
    },
    devServer: {
        contentBase: path.join(__dirname, "dist")
    }
};