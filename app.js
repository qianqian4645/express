var express = require('express')
// 0 引包
var bodyParser = require('body-parser')
var app = express()

var list=[
    {
        name:'张三',
        msg:'今天天气不错',
        dateTime:'2020-09-15'
    },
    {
        name:'李四',
        msg:'明天天气估计也不错',
        dateTime:'2020-09-15'
    },
    {
        name:'王五',
        msg:'明天天气估计也不错',
        dateTime:'2020-09-15'
    }
]

app.use('/public/',express.static('./public/'))
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('html', require('express-art-template'));


app.get('/',function(req,res){
      res.send("可以运行了")
})
app.get('/home',function(req,res){
    res.render("index.html",{
        list:list
    })
})
app.get('/biaodan',function(req,res){
    res.render("form.html")
})
app.get('/get',function(req,res){
    console.log(req.query)
    // res.render("form.html")
    var lists=req.query
    lists.dateTime="2020-09-14"
    list.unshift(lists)
    res.redirect('/home')
})
// 获取post  请求
app.post('/post',function(req,res){
    console.log(req.body)
    // res.render("form.html")
    var lists=req.body
    lists.dateTime="2020-09-14"
    list.unshift(lists)
    res.redirect('/home')
})

app.listen('3000',function(){
    console.log("app in running")
})