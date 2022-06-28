const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/public/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.mode = 'development'
    config.devServer = {
      hot: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
      port: 9000,
    }
    config.devtool = 'inline-source-map'
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  if (argv.mode === 'production') {
    config.mode = 'production'
    config.plugins.push(new BundleAnalyzerPlugin())
  }

  return config
}
