const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const R = require('./models/restaurant')
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
  R.find()
    .lean()
    .then(rs => res.render('index', { restaurant: rs }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return R.findById(id)
    .lean()
    .then((r) => res.render('detail', { restaurant: r }))
    .catch(error => console.log(error))  
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