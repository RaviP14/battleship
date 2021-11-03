const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    loaders: [
        {exclude: ['node_modules'], loader: 'babel', test: /\.jsx?$/},
        {loader: 'style-loader!css-loader', test: /\.css$/},
        {loader: 'url-loader', test: /\.gif$/},
        {loader: 'file-loader', test: /\.(ttf|eot|svg)$/},
    ],
    rules: [
    {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
        loader: "babel-loader",
        options: {
            presets: ['@babel/preset-env']
        }
        }
    }
    ]
  },
  resolve: {
    alias: {
      config$: './configs/app-config.js',
      react: './vendor/react-master',
    },
    extensions: ['', 'js', 'jsx'],
    modules: [
      'node_modules',
      'bower_components',
      'shared',
      '/shared/vendor/modules',
    ],
  },
};