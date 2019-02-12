var express = require('express')
var router = require('./router.js')
var bodyParser = require('body-parser')

var app = express()

//配置express-art-template
app.engine('html', require('express-art-template'))
//配置 body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//开放 public
app.use('/public/', express.static('./public/'))

//挂载路由器到 app.js 中
app.use(router)

app.listen(3000, function(err) {
	console.log('Server is running......')
})