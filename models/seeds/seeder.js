const mongoose = require('mongoose')
const Restaurants = require('../restaurant')
const { results: restaurants } = require('../../restaurant')

mongoose.connect('mongodb://localhost/restaurant-list',  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurants.length; i++) {
    Restaurants.create(restaurants[i])
  }
})