const MODE = `development`;

module.exports = {
  // development / production
  mode: MODE,
  target: `node`,

  // entry / output
  entry: `./src/index.js`,
  output: {
    path: `${__dirname}/dist`,
    filename: `index.js`,
    libraryTarget: `commonjs2`,
  },
  externals: {
    "@actions/github": `@actions/github`,
  },

  module: {
    rules: [
      // use babel-loader with js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
          options: {
            babelrc: true,
          },
        },
      },
    ],
  },
};
