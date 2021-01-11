var path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: path.resolve(__dirname, '../_resources/js/scripts.js'),
    output: {
        path: path.resolve(__dirname, '../assets/js'),
        publicPath: '/assets/js/',
        filename: 'scripts.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
        ]
    },
    plugins: [
    ],
    performance: {
        hints: false
    },
}