const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageInfo = require("./package.json");
const webpack = require("webpack");

const APP_NAME = packageInfo.name;

const babelLoader = {
    loader: "babel-loader",
    options: {
        presets: [
            ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
            "@babel/preset-react"
        ],
        plugins: ["@babel/transform-runtime"]
    }
};

const config = {
    entry: {},
    output: {
        path: path.resolve(__dirname, "dist/bundles"),
        filename: "[name].[chunkhash].js",
        publicPath: "/static/bundles"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    "file-loader?name=../pages/[name].[ext]",
                    "extract-loader",
                    "html-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: babelLoader
            }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[name]-bundle.map",
            append: "\n//# sourceMappingURL=[url]",
            moduleFilenameTemplate: `${APP_NAME}:///[resource-path]`
        })
    ],
    watch: true
};

/**
 * Add a page that will be served as a boilerplate HTML document
 * that serves up the given javascript file as a client-side script.
 * The client-side script runs at the end of page load.
 */
function addClientSideScript(name, scriptPath) {
    config.entry[name] = [
        path.resolve(
            __dirname,
            "node_modules",
            "source-map-support",
            "register.js"
        ),
        scriptPath
    ];
    config.plugins.push(
        new HtmlWebpackPlugin({
            chunks: [name],
            filename: `../pages/${name}.html`,
            title: name
        })
    );
}

addClientSideScript("index", "./src/pages/index.js");

module.exports = config;
