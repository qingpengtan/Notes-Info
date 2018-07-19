####Webpack
1.全局安装 cnpm i webpack -g
2.局部安装 cnpm i webpack --save
3.配置webpack-config.js
4.安装本地服务器 cnpm i webapck-dev-server --save-dev
######插件 
1.html 插件 cnpm i html-webpack-plugin --save-dev 简化了html创建
2.文件独立插件 extract-text-webpack-plugin --save-dev
3.提出公共模块 webpack.optimize.CommonsChunkPlugin({
    name:'',
    filename:'',
})
4.ProvidePlugin 引入外部文件的js
```js
{
    test:/\.css$/,
    use:ExtractTextPlugin.extract({
        fallback:'style-loader',
        use:'css-loader'
    })
}
```
resolve 
```js
resolve:{
    alias:{
        jquery$:path.resolve(_dictname:"")  
    }
}
//-----------------
{
    test:path.resolve(__dirname,"),
    use:[
        {
            loader:'imports-loader',
            options:{
                $:'jquery'
            }
        }
    ]
}
```
####Grunt
####Glup
