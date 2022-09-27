var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

//Below is the requiring of mongoDB of node(which is not yet installed from npm)
var mongoose = require('mongoose')

var app = express()

//Below is the database connectivity(which willnot work now as mongoose is not yet installed)
//mongoose.connect('mongodb+srv://kamalapriya:GopiArunikaa1214$@cluster0.xl1ur.mongodb.net/Node_Tutorials?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://kamalapriya:GopiArunikaa1214$@cluster0.xl1ur.mongodb.net/Node_Tutorials')
var port = process.env.PORT || 3000

var urlencodedParser = bodyParser.urlencoded({ extended : false })
var jsonParser = bodyParser.json()

app.listen(port)

app.use('/font', express.static(__dirname + '/public'))

app.set('view engine', 'ejs')

app.use(function(req, res, next){
    console.log('Requested Url: ' + req.url)
    next()
})

app.use('/api', cookieParser())

app.get('/', function(req, res){
 //   res.send('<html><head><link href = "/font/style.css" type = "text/css" rel = "stylesheet"></head><body><h1>Amritanandamayi!!</h1></body></html>')
    res.render('index')
})

app.get('/oops?*concepts', function(req, res){
 //   res.send('<html><head><link href = /font/style.css type = text/css rel = stylesheet></head><body><h2>Object Oriented Programming Concepts</h2></body></html>')
    res.render('oops', { Qstr1 : req.query.qstr1, Qstr2 : req.query.qstr2 })
})

app.get('/Person/:id', function(req, res){
 //   res.send('<html><head><link href = /font/style.css type = text/css rel = stylesheet></head><body><h3>It\'s the person: ' + req.params.id + '</h3></body></html>')
    res.render('person', { ID : req.params.id})
})

app.get('/Person1/:id', function(req, res){
    res.render('person1', {ID : req.params.id, Qstr1 : req.query.qstr1})
})

app.get('/api', function(req, res){
    console.log('Cookies: ', req.cookies)
    res.json(
        {
            fname : 'Kamalapriya',
            lname : 'Subramanian'
        })   
})

app.get('/login', function(req, res){
    res.render('login')
})

app.post('/login', urlencodedParser, function(req, res){
 //    res.send('Thank you ' + req.body.fname + ' ' + req.body.lname + '!!') 
     res.render('index', { FNAME : req.body.fname, LNAME : req.body.lname })
})

app.post('/loginjson', jsonParser, function(req, res){
    console.log(req.body.firstname)
    console.log(req.body.lastname)
    res.send(req.body)
})
   


