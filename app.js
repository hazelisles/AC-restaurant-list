const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const Restaurants = require('./models/restaurant')
const exphbs = require('express-handlebars')

mongoose.connect('mongodb://localhost/restaurant-list',  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
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
  const { id } = req.params
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
  if (!req.body.image) {
    // if no image link use Default image
    req.body.image = 'https://i.pinimg.com/564x/d8/4d/5b/d84d5bbd8f83a7e03193da998c801a9a.jpg'
  }
  return Restaurants.create(req.body)
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})
// edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const { id } = req.params
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))  
})
// receive edit redirect to detail page
app.post('/restaurants/:id', (req, res) => {
  const { id } = req.params
  return Restaurants.findById(id)
    .then(r => {
      r = Object.assign(r, req.body)
      return r.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// delete
app.post('/restaurants/:id/delete', (req, res) => {
  const { id } = req.params
  return Restaurants.findById(id)
    .then(r => r.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurants.find({"$or": [{"name": {$regex : new RegExp(keyword, "i") }},  {"category": { $regex : new RegExp(keyword, "i") }}, {"name_en": { $regex : new RegExp(keyword, "i") }}]})
    .lean()
    .then(restaurant => res.render('index', { restaurant, keyword }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Start listening on http://localhost:${port}`)
})