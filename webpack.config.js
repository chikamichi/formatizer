/*
 * Package Import
 */
const path = require('path');

// Plugins
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/*
 * Init
 */
const isDevelopment = process.env.NODE_ENV === 'development';

/*
 * Code
 */
const isAnalyze =
  process.argv.includes('--analyze') || process.argv.includes('--analyse');

/*
 * Config
 */
function getEntry() {
  return isDevelopment ? './example/index.js' : './src/index.js';
}

function getOutput() {
  if (isDevelopment) {
    return {
      path: path.resolve('./public'),
      filename: 'static/js/[name].js',
      libraryTarget: 'umd', //
    };
  }

  return {
    path: path.resolve('./dist'),
    filename: '[name].js',
    library: 'formatizer',
    libraryTarget: 'umd',
    globalObject: 'this',
  };
}

function getExternals() {
  return !isDevelopment ? [nodeExternals()] : [];
}

function getModule() {
  // Base Module
  const rules = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: isDevelopment,
        },
      },
    },
  ];

  if (isDevelopment) {
    rules.push(
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: isDevelopment },
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 1, sourceMap: isDevelopment },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              // Max 10kb
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
              emitFile: true,
            },
          },
        ],
      },
    );
  }
  return {
    rules,
  };
}

function getPlugins() {
  return isDevelopment
    ? [
      // Generates an `index.html` file with the <script> injected
      new HtmlWebpackPlugin({
        inject: true,
        filename: 'index.html',
        template: './example/assets/index.html',
      }),

      new MiniCssExtractPlugin({
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[name].css',
      }),
    ]
    : [
      // Clear the `dist` folder
      new CleanWebpackPlugin(),

      // Webpack Bundle Analyzer
      // https://github.com/th0r/webpack-bundle-analyzer
      ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
    ];
}

/*
 * Webpack Config
 */
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
  entry: getEntry(),
  output: getOutput(),

  // Resolve
  resolve: {
    // Where Webpack is need to seeing / resolving files.
    modules: [
      'node_modules',
      path.resolve('node_modules'),
      path.resolve('./example'),
      path.resolve('./src'),
    ],
    extensions: ['.js', '.jsx', '.json'],
  },

  externals: getExternals(),

  // Rules / Loaders
  module: getModule(),

  // Plugins
  plugins: getPlugins(),
};
