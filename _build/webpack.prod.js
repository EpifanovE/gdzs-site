const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: false
        })
    ]
});