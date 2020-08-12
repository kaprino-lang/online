import * as webpack from "webpack";
import * as path from "path";

const rules: webpack.Rule[] = [
    {
        test: /\.ts(x?)$/,
        use: [
            {
                loader: "ts-loader"
            }
        ]
    },
    {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
    }
];

const webpackModule: webpack.Module = {
    rules: rules
};

const config: webpack.Configuration = {
    mode: "production",

    devtool: "source-map",

    target: "node",

    entry: {
        index: "./src/components/index.tsx"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(process.cwd() + "/dist")
    },

    module: webpackModule,

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    }
};

export default config;