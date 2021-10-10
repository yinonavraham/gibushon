const styleloader = require('style-loader');
const cssloader = require('css-loader');
const path = require('path');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InjectBodyPlugin = require('inject-body-webpack-plugin').default;
const {InjectManifest} = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Gibushon - גיבושון",
      favicon: "./src/images/icons/favicon.ico",
    }),
    new InjectBodyPlugin({
      content: '<div id="content"></div>'
    }),
    new InjectManifest({
      swSrc: './src/sw.js',
    }),
    new WebpackPwaManifest({
      name: 'Gibushon - גיבושון',
      short_name: 'gibushon',
      description: 'Candidate assessment system [PWA]',
      background_color: '#f69435',
      theme_color: '#f69435',
      orientation: 'portrait',
      display: 'standalone',
      inject: true,
      fingerprints: true,
      ios: true,
      publicPath: '/',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/images/icons/icon.png'),
          sizes: [192, 256, 384, 512],
          destination: path.join('images', 'icons'),
        },
      ]
    })
  ]
};