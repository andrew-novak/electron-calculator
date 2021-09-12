import { EnvironmentPlugin, HotModuleReplacementPlugin } from "webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { join } from "path";
import { spawn } from "child_process";

const PORT = process.env.PORT || 1212;
const publicPath = `http://localhost:${PORT}/dist`;

export default {
  mode: "development",
  target: "electron-renderer",
  entry: require.resolve("../src/renderer/index.js"),
  output: {
    publicPath: `http://localhost:${PORT}/dist/`,
    filename: "renderer.dev.js"
  },
  resolve: {
    extensions: [".js", ",json", ".css"]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            cacheDirectory: true,
            plugins: [require.resolve("react-refresh/babel")].filter(Boolean)
          }
        }
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
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  devServer: {
    port: PORT,
    publicPath,
    contentBase: join(__dirname, "dist"),
    before() {
      console.log("Starting Main Process...");
      spawn("npm", ["run", "start:main"], {
        shell: true,
        env: process.env,
        stdio: "inherit"
      })
        .on("close", code => process.exit(code))
        .on("error", spawnError => console.error(spawnError));
    }
  }
};
