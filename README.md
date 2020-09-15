# express
node express 搭建的demo


https://github.com/smallC-L-Y/Demo/blob/notes/nodeJS%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md


升级npm(自己升级自己)：
npm install --global npm

一. 常用npm命令

npm init(生成package.json说明书文件)
    npm init -y(可以跳过向导，快速生成)
   
npm install
    一次性把dependencies选项中的依赖项全部安装
    简写（npm i）   
    
npm install 包名
    只下载
    简写（npm i 包名）
    
npm install --save 包名()
    下载并且保存依赖项（package.json文件中的dependencies选项）
    简写（npm i 包名）
    
npm uninstall 包名
    只删除，如果有依赖项会依然保存
    简写（npm un 包名）
    
npm uninstall --save 包名
    删除的同时也会把依赖信息全部删除
    简写（npm un 包名）
    
npm help
    查看使用帮助
    
npm 命令 --help
    查看具体命令的使用帮助（npm uninstall --help）

二.安装淘宝的cnpm：

    npm install -g cnpm --registry=https://registry.npm.taobao.org;
    
    #在任意目录执行都可以
    #--global表示安装到全局，而非当前目录
    #--global不能省略，否则不管用
    npm install --global cnpm
    
    npm config set registry https://npm.taobao.org;

    #查看npm配置信息
    npm config list;
    
三.Express

以下是案例：

// 1 安装  cnpm install express
// 2 引包
var express = require('express');
// 3 创建服务器应用程序
//      也就是原来的http.createServer();
var app = express();

// 公开指定目录
// 只要通过这样做了，就可以通过/public/xx的方式来访问public目录中的所有资源
// 在Express中开放资源就是一个API的事
app.use('/public/',express.static('/public/'));

//模板引擎在Express中开放模板也是一个API的事

// 当服务器收到get请求 / 的时候，执行回调处理函数
app.get('/',function(req,res){
    console.log(req.qurey)  //get请求获取数据的方式
    res.send('hello express');
})

// 相当于server.listen
app.listen(3000,function(){
    console.log('app is runing at port 3000');
})

四. art-template 
    //安装
    npm install --save art-template
    npm install --save express-art-template

    //两个一起安装
    npm i --save art-template express-art-template
    
    //配置
    app.engine('html', require('express-art-template'));
    
    //使用
    app.get('/',function(req,res){
    // express默认会去views目录找index.html
        res.render('index.html',{
               title:'hello world'     
        });
    })
    
五. 获取post请求数据(比较重要)

    在Express中没有内置获取表单post请求体的api，这里我们需要使用一个第三方包body-parser来获取数据。
    
    //安装
    npm install --save body-parser;
    
    // 引包
    var express = require('express')
    var bodyParser = require('body-parser')

    var app = express()

    // 配置body-parser   （配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ））
    // 只要加入这个配置，则在req请求对象上会多出来一个属性：body
    // 也就是说可以直接通过req.body来获取表单post请求数据
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())
    
    //使用：
    app.use(function (req, res) {
      res.setHeader('Content-Type', 'text/plain')
      res.write('you posted:\n')
      // 可以通过req.body来获取表单请求数据
      res.end(JSON.stringify(req.body, null, 2))
    })
