var mongoose = require('mongoose')

var CustomerSchema = mongoose.Schema

var CustomerModel = new CustomerSchema({
    customer_name : String,
    movie_name : String,
    movie_genre : String
})

var MovieCustomers = mongoose.model('MovieCustomers', CustomerModel)

module.exports = MovieCustomers