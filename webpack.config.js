const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');

const PAGES_DIR = `src/pug/views/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
    mode: "development",

    resolve: {
        extensions: [".pug", ".js", ".css", ".scss", ".sass"]
    },

    entry: [
        './src/js/index.js',
        './src/scss/index.scss'
    ],

    plugins: [
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`
        })),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/img',
                    to: './img'
                }
            ]
        })
    ],

    module: {
        rules: [
            // Loading pug
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },

            // Loading js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            // Loading CSS
            {
                test: /\.(css)$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },

            // Loading SASS/SCSS
            {
                test: /\.(s[ca]ss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
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
