var webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var path = require("path");
const GlobEntries = require("webpack-glob-entries");

module.exports = {
    mode: "production",
    entry: GlobEntries("./src/*-test.{js,ts}"), // Generates multiple entry for each test
    output: {
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "commonjs",
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                // by default, it resolves `node_modules`
            },
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: 'ts-loader'
            }
        ],
    },
    plugins: [new CleanWebpackPlugin()], // Clean dist directory before generating bundle files
    target: 'web',
    externals: /^(k6|https?\:\/\/)(\/.*)?/,
    resolve: {
        extensions: ['.ts', '.js'], // Resolve imports when extensions are left out in the following order
    },
    devtool: "source-map", // Generate source maps so that transpiled code can be matched to original code
    stats: {
        colors: true, // Output Webpack bundling results in colour. It already does it without this being set. We can change the colors here as well if needed 
    }
};
