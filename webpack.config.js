var path = require('path');
module.exports = {
    entry: './assets/js/app.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'assets/js'),
              loader: 'babel-loader' }
        ]
    }
};
