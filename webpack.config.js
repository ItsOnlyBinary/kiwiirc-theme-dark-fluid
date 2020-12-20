const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const makeSourceMap = process.argv.indexOf('--srcmap') > -1;

module.exports = {
    mode: 'production',
    entry: './src/plugin.js',
    output: {
        filename: 'theme-dark-fluid.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{loader: 'exports-loader'}, {loader: 'babel-loader'}],
                include: [
                    path.join(__dirname, 'src'),
                ]
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './res/theme'),
                to: 'theme-dark-fluid/theme/',
                ignore: ['.*']
            },
        ])
    ],
    devtool: makeSourceMap ? 'source-map' : '',
    devServer: {
        filename: 'theme-dark-fluid.js',
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};