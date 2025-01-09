const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // Cleans up the dist folder before each build
  },
  resolve: {
    extensions: [".js", ".jsx"], // Allow importing without specifying extensions
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
        use: ["style-loader", "css-loader"], // Load CSS files
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", // Automatically uses file-loader in Webpack 5+
      },
      {
        test: /\.pdf$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]", // Customize the filename and location
              outputPath: "pdfs/", // Save PDFs in the 'pdfs' folder inside 'dist'
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  devServer: {
    static: "./dist",
    port: 3000 || 3001, // Change port if needed
    open: true, // Automatically opens the browser
  },
};
