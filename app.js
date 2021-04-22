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
  res.render('show')
})

app.listen(port, () => {
  console.log(`Start listening on http://localhost:${port}`)
})