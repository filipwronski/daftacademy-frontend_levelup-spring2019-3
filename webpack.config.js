const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
var path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';
module.exports = {
    mode:  process.env.NODE_ENV,
    entry: './src/index.js',
    watch: true,
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader:'file-loader'
            },
            { 
                test: /\.svg$/, 
                loader: 'svg-loader?pngScale=2'
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isDevelopment 
                    ? MiniCssExtractPlugin.loader
                    : { loader: 'style-loader', options: { sourceMap: true} },
                    { loader: 'css-loader', options: {sourceMap: isDevelopment } },
                    { loader: 'postcss-loader', options: { soruceMap: isDevelopment} },
                    { loader: 'sass-loader', options: { sourceMap: isDevelopment } },
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new HtmlWebpackInlineSVGPlugin({
            runPreEmit: true,
        }),
    ]
}