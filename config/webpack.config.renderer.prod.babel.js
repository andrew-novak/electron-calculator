import { join } from "path";
import { EnvironmentPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "production",
  target: "electron-renderer",
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
      NODE_ENV: "production"
    }),
    new HtmlWebpackPlugin({
      template: "src/renderer/index.html"
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  }
};
