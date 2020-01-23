var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist', 'build', 'public', 'client'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['@babel/env', '@babel/react']
            }
        },
        {
            test: /\.css$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" }
            ]
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                'url-loader?limit=10000',
                'img-loader'
            ]
        }
        ],
    },
    plugins: []
};