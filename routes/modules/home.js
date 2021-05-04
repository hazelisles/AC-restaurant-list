const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

// 首頁路由
router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(Restaurants => res.render('index', { restaurant: Restaurants }))
    .catch(error => console.log(error))
})

// create page
router.get('/create', (req, res) => {
  return res.render('create')
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurants.find({"$or": [{"name": {$regex : new RegExp(keyword, "i") }},  {"category": { $regex : new RegExp(keyword, "i") }}, {"name_en": { $regex : new RegExp(keyword, "i") }}]})
    .lean()
    .then(restaurant => res.render('index', { restaurant, keyword }))
    .catch(error => console.log(error))
})

module.exports = router