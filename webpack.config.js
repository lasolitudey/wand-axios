const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map'
}
