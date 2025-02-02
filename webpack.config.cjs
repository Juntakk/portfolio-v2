import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: (module, chunks, cacheGroupKey) =>
        `${cacheGroupKey}-${chunks[0].name || "chunk"}`,
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][hash][ext]",
        },
      },
      {
        test: /\.pdf$/,
        type: "asset/resource",
        generator: {
          filename: "pdfs/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  devServer: {
    static: "./dist",
    port: 3000,
    open: true,
  },
};
