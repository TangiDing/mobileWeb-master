const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: "/node_modules/",
        use: "vue-loader"
      },
      {
        test: /\.ts$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', "@babel/preset-typescript"]
            }
          },
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.css|scss$/,
        exclude: "/node_modules/",
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                ]
              }
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        exclude: "/node_modules",
        type: 'asset/resource',
      },
      // {
      //   enforce: 'pre',
      //   test: /\.(ts|js)$/,
      //   loader: "eslint-loader",
      //   exclude: "/node_modules/"
      // }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/template.html"
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
  },
  devServer: {
    static: "./dist"
  }
}