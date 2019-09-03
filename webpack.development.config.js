//Modulo de directorios
const path = require('path');

//Extract css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.join(__dirname, 'source'),
  entry: {
    login: './js/login.js',
    panelAdmin: './js/panelAdmin.js',
    panelUser: './js/panelUser.js'
  },
  output: {
    filename: './assets/js/[name].bundle.js',
    path: __dirname + '/testing'
  },
  module: {
  	rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(sass|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      { 
        test: /\.(woff(2)?|ttf|eot)$/, 
        exclude: /node_modules/, 
        loader: "file-loader",
        options: {
          name: '[folder]/[name].[ext]',
          //Ruta de salida de archivo
          outputPath: 'assets/css/fonts/',
          //Ruta a publicar en el css
          publicPath: 'fonts/'
        }
      },
      { 
        test: /\.(png|jpe?g|svg|gif)$/, 
        exclude: /node_modules/, 
        loader: "file-loader",
        options: {
          name: 'img/[name].[ext]',
          outputPath: 'assets/',
          publicPath: '../'
        }
      }
  	]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/assets/css/[name].css'
    })
  ],
  //Fix watch
  watchOptions: {
    poll: true,
    ignored: '/node_modules/'
  }
};