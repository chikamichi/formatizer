/*
 * Package Import
 */
const path = require('path');

// Core
const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/*
 * Init
 */
const isDev = process.env.NODE_ENV === 'development';

/*
 * Code
 */
const isAnalyze =
  process.argv.includes('--analyze') || process.argv.includes('--analyse');

/*
 * Webpack Config
 */
module.exports = {
  // Mode
  mode: isDev ? 'development' : 'production',

  // Entry
  entry: {
    app: isDev
      ? [
        './example/styles/style.css',
        './example/styles/picker.css',
        './example/index.js',
      ]
      : ['./src/index.js'],
  },

  // Output
  output: {
    path: isDev ? path.resolve('./public') : path.resolve('./dist'),
    filename: isDev ? 'static/js/[name].js' : 'index.js',
    publicPath: '/',
    libraryTarget: isDev ? 'umd' : 'commonjs2',
  },

  // Resolve
  resolve: {
    // Where Webpack is need to seeing / resolving files.
    modules: ['node_modules', path.resolve('./app')],
    extensions: ['.js', '.jsx', '.json'],
  },

  // Rules / Loaders
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: isDev,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 1, sourceMap: isDev },
          },
        ],
      },
    ],
  },

  // Optimization
  optimization: {
    // Override the default minimizer
    minimizer: [
      // Uglify JS files
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
    ],
  },

  // Plugins
  plugins: isDev
    ? [
      new HtmlWebpackPlugin({
        inject: true,
        filename: 'index.html',
        template: './example/assets/index.html',
      }),

      new MiniCssExtractPlugin({
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[name].css',
      }),

      // This is necessary to emit hot updates (currently CSS only).
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ]
    : [
      // Clear the `dist` folder
      new CleanWebpackPlugin(),

      // Webpack Bundle Analyzer
      // https://github.com/th0r/webpack-bundle-analyzer
      ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
    ],

  // If we need to reload automagically during the dev
  watch: isDev,

  // Settings `webpackDevServer`
  devServer: {
    // Enable gzip compression of generated files
    compress: true,
    // This tells `webpackDevServer` to serve the files
    // from the dist directory on localhost.
    // @TODO • Voir si c'est cette partie est OK
    contentBase: '/',
    // Active HMR • only changes to CSS are currently hot reloaded.
    // JS changes will refresh the browser
    hot: true,
    // Fix the problem with React-Router (Cannot get /route when we refresh).
    historyApiFallback: true,
    // Build progress in console
    progress: true,
    // It is important to tell `webpackDevServer` to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: '/',
    // Port
    port: 3000,
    // What do you need display in your console?
    // More info : https://webpack.js.org/configuration/stats/#stats
    stats: {
      colors: true,
      modules: false,
      timings: true,
    },
    // Watch options
    watchOptions: {
      ignored: /node_modules/,
    },
  },

  // Turn off performance hints
  performance: {
    hints: false,
  },
};
