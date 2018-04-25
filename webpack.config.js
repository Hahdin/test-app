const path = require('path')

module.exports = {
  entry: './src/index.js',
  target: "node",
  mode: "development",
  output: {
    filename: 'mybundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve:{
    extensions: [
      ".js",
      ".json",
    ],
  },
  module:{
    rules:[{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use:[{
        loader: 'babel-loader',
        query:{
          presets: ['env']
        }
      }]
    }]
  }
}