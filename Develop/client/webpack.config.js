const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Jate',
      }),
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'sw.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        Name: 'Just Another Text Editor',
        short_name: 'Jate',
        description: 'A simple text editor',
        background_color: '#01579b',
        theme_color: '#ffffff',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/assets/icons/icon-512x512.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
            },
          },
        },
              
      ],
    },
  };
};
