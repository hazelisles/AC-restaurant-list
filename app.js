const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

const exphbs = require('express-handlebars')
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

app.listen(port, () => {
  console.log(`Start listening on http://localhost:${port}`)
})