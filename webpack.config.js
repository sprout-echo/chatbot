'use strict';
var path = require('path');
var webpack = require('webpack');
module.exports = {
  //为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
  devtool:'eval-source-map',
  entry:{
    main:'./src/main.js'    //唯一入口文件
  },
  output:{
    path:'./build',     //打包后文件存放的地方
    filename:'main.js',   //打包后输出文件的文件名
    publicPath:'http://localhost:8800/build'     //启动本地服务后的根目录
  },
  //服务器配置
  devServer:{
    port:8800,
    colors:true,  //终端中输出结果为彩色
    historyApiFallback: true,  //不跳转
    inline: true  //实时刷新
  },
  module:{
    //文件的加载器
    //url-loader用于在js中加载png/jpg格式的图片文件，css/style loader用于加载css文件，less-loader加载器是将less编译成css文件；
    loaders:[
      {test:/\.js?$/,loader:'jsx!babel',include:/src/},
      {test:/\.css$/,loader:['style-loader','css-loader']},
      {test:/\.(png|jpg)$/,loader:'url-loader?limit=819200'}
    ]
  },
  postcss: [
      require('autoprefixer')    //调用autoprefixer插件,css3自动补全
  ],
  //resolve：用于指明程序自动补全识别哪些后缀
  resolve:{
    extensions:['','.js','.json','coffee']
  }
}
