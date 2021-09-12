import { join } from "path";
import { EnvironmentPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const PORT = process.env.PORT || 1212;

export default {
  mode: "development",
  target: "web",
  entry: require.resolve("../src/renderer/index.js"),
  output: {
    path: join(__dirname, "../prod/bundle"),
    filename: "renderer.prod.js"
  },
  resolve: {
    extensions: [".js", ".json", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [require.resolve("babel-loader")]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: "development"
    }),
    new HtmlWebpackPlugin({
      template: "src/renderer/index.browser.html"
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  },
  devServer: {
    port: PORT,
    open: true
  }
};
