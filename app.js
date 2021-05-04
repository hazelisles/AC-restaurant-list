const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')

mongoose.connect('mongodb://localhost/restaurant-list',  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
  console.log(`Start listening on http://localhost:${port}`)
})