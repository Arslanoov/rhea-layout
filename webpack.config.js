const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",

    resolve: {
        extensions: [".js", ".css", ".scss", ".sass"]
    },

    entry: [
        './src/js/index.js',
        './src/scss/index.scss'
    ],

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/html/views/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        /*new CopyWebpackPlugin([{
            patterns: [
                {
                    from: './src/fonts',
                    to: './fonts'
                },
                {
                    from: './src/favicon',
                    to: './favicon'
                },
                {
                    from: './src/img',
                    to: './img'
                },
                {
                    from: './src/uploads',
                    to: './uploads'
                }
            ]
        }])*/
    ],

    module: {
        rules: [
            // Loading CSS
            {
                test: /\.(css)$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader']
            },

            // Loading SASS/SCSS
            {
                test: /\.(s[ca]ss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true,
        historyApiFallback: true
    }
};
