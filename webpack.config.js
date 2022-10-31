const path = require('path')

let params = {
    //入口文件
    entry: './src/index.js',
    //输出
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ruax.js',
        library: 'Ruax',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}

if (process.env.NODE_ENV == 'development') {
    params.devtool = 'eval-source-map' //调试可看到源码
}

module.exports = params
