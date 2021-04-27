const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')

mongoose.connect('mongodb://localhost/restaurant-list',  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  const restaurant = restaurantList.results
  res.render('index', { restaurant })
})

app.get('/restaurants/:id', (req, res) => {
  const theOne = restaurantList.results.find(r => r.id.toString() === req.params.id)
  res.render('show', { restaurant: theOne })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurant = restaurantList.results.filter(r => r.category.includes(keyword) || r.name.toLowerCase().includes(keyword.toLowerCase()))
  let unFind = false
  if (restaurant.length === 0) {
    unFind = true
  }
  res.render('index', { restaurant, keyword, unFind })
})

app.listen(port, () => {
  console.log(`Start listening on http://localhost:${port}`)
})