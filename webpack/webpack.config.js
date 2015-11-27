const path = require('path');
const outputPath = path.resolve('', 'build/');

const config = {
  entry: './src/app.js',
  // devtool: 'source-map',
  output: { path: __dirname + '/bundle', filename: 'bundle.js' },
  module: {
    preLoaders: [{
      test: /\.js$|\.jsx$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};

module.exports = config;