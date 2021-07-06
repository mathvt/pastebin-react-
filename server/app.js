const express = require('express')
const path = require('path')
const logger = require('morgan')


let indexRouter = require('./routes/index')
let listRouter = require('./routes/list.js')

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(logger('dev'))
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, 'public')))
//app.use(express.static(path.join(__dirname, 'views')))
//app.use(express.static(path.join(__dirname, '/node_modules/codemirror')))



app.use('/list', listRouter)
app.use('/', indexRouter) //last pos !




app.listen(port, '0.0.0.0')
console.log('Server started at http://localhost:' + port)