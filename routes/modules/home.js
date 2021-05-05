const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')
const toSort = require('../../sort')

// 首頁路由
router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(Restaurants => res.render('index', { restaurant: Restaurants }))
    .catch(error => console.log(error))
})

// create page
router.get('/create', (req, res) => {
  return res.render('create')
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const query = new RegExp(keyword, "i")
  return Restaurants.find({"$or": [{"name": { $regex : query }},  {"category": { $regex : query }}, {"name_en": { $regex : query }}]})
    .lean()
    .then(restaurant => res.render('index', { restaurant, keyword }))
    .catch(error => console.log(error))
})

router.get('/sort', (req, res) => {
  const sortType = req.query.sort
  const selectedSort = toSort(sortType)
  Restaurants.find()
    .lean()
    .sort(selectedSort)
    .then(Restaurants => res.render('index', { restaurant: Restaurants }))
    .catch(error => console.log(error))
})
module.exports = router