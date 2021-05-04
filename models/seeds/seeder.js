const db = require('../../config/mongoose')
const Restaurants = require('../restaurant')
const { results: restaurants } = require('../../restaurant')

db.once('open', () => {
  for (let i = 0; i < restaurants.length; i++) {
    Restaurants.create(restaurants[i])
  }
  console.log('Done!')
})