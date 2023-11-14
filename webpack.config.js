const path = require('path');
const webpack = require("webpack");
const dotenv = require("dotenv");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: {
    bundle: './src/index.tsx' // The entry point for the application
  },
  output: {
    path: path.join(__dirname, 'dist'), // The output directory for the compiled files
    filename: '[name].js', // The name of the compiled file
    publicPath: '/' // The public URL of the output directory
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'] // The file extensions that Webpack should resolve
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // The directory to serve static files from
    },
    open: true, // Open the application in the default browser when the server starts
    historyApiFallback: true // Enable HTML5 history API fallback
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.(ts|tsx)$/, // Use the TypeScript loader for .ts and .tsx files
      },
      {
        test: /\.scss$/i,
        exclude: /\.module\.scss$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "icss",
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      // --------
      // SCSS MODULES
      {
        test: /\.module\.scss$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    // ...
    new webpack.DefinePlugin(envKeys), // Define environment variables for the application
    new BundleAnalyzerPlugin() // Generate a report of the application's bundle size
  ],
}