var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var MovieCustomers = require('./CustomerModel')

var jsonParser = bodyParser.json()

var app = express()

mongoose.connect('mongodb+srv://kamalapriya:GopiArunikaa1214$@cluster0.xl1ur.mongodb.net/Node_Tutorials')

var port = process.env.PORT || 3000
app.listen(port)

app.use('/font', express.static(__dirname + '/public'))

app.set('viewengine', 'ejs')

//Creation of initial seed data to the database
/* 
var customerSeedData = [
    {
        customer_name : 'Kamalapriya',
        movie_name : 'Movie1',
        movie_genre : 'Thriller'
    },
    {
        customer_name : 'Selva',
        movie_name : 'Movie2',
        movie_genre : 'Horror'
    }
]

MovieCustomers.create(customerSeedData, function(err, results){
    console.log(results)
})
*/

app.get('/api/MovieCustomers', function(req, res){
    MovieCustomers.find(function(err, results){
        if (err) throw err

        if(results.length === 0)
            res.status(404).send('Database\'s collection is empty')
        else
            res.send(results)
    })
})

app.get('/api/MovieCustomers/:uname', function(req, res){
    MovieCustomers.find({ customer_name: req.params.uname }, function(err, results){
        if (err) throw err

        if(results.length === 0)
            res.status(404).send('No such customer exists')
        else
            res.send(results)
    })
})

app.get('/api/MovieCustomer/:id', function(req, res){
    MovieCustomers.findById({ _id : req.params.id }, function(err, result){
        if(err) throw err

        if(result === null)
            res.send('No such id exists')
        else
            res.send(result)
    })
})

app.post('/api/MovieCustomers', jsonParser, function(req, res){

    var new_data = MovieCustomers({
        customer_name : req.body.customer_name,
        movie_name : req.body.movie_name,
        movie_genre : req.body.movie_genre
    })

    new_data.save(function(err, result){
        if(err) throw err

        res.send('Sucessfully created a new document: \n' + result)
    })

})

