const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const Restaurants = require('./models/restaurant')
const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// 首頁路由
app.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(Restaurants => res.render('index', { restaurant: Restaurants }))
    .catch(error => console.log(error))
})
// detail page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))  
})
// create page
app.get('/create', (req, res) => {
  return res.render('create')
})
// receive creation redirect to 首頁
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = Number(req.body.rating)
  const description = req.body.description
  return Restaurants.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})
// edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))  
})
// receive edit redirect to detail page
app.post('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = Number(req.body.rating)
  const description = req.body.description
  return Restaurants.findById(id)
    .then(r => {
      r.name = name
      r.name_en = name_en
      r.category = category
      r.image = image
      r.location = location
      r.phone = phone
      r.google_map = google_map
      r.rating = rating
      r.description = description
      return r.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// delete
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(r => r.remove())
    .then(() => res.redirect('/'))
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