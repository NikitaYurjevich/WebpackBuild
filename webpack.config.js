const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './app/js/index.js',
        vendor: './app/js/vendor.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },

            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '/fonts/',
                        publicPath: '../fonts/',
                    },
                }],
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '/img/',
                        publicPath: '../img/',
                    },
                }],
            },

        ],
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js'
    },
    plugins: [
        // new htmlWebpackPlugin({filename: 'index.html'}),
        new MiniCssExtractPlugin({
            filename: 'css/app.css',
            chunkFilename: 'css/[id].css',
        }),

        new BrowserSyncPlugin(
            {
                host: 'localhost',
                proxy: 'http://localhost:3000/'
            },
        ),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [],
            cleanAfterEveryBuildPatterns: ['!*.html', '*.bundle.js', '*.*.bundle.js'],
        }),
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: 'source-map',
    // watch: true,
    // watchOptions: {
    //     aggregateTimeout: 200,
    //     poll: 1000,
    //     ignored: /node_modules/,
    // },
};

if (process.env.SHOW_STAT === 'true') {
    module.exports.plugins.push(
        new BundleAnalyzerPlugin(),
    )
}
