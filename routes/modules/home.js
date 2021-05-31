const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')
const toSort = require('../../sort')

// 首頁路由
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const restaurant = await Restaurants.find({ userId }).lean().sort({ _id: 'asc' })
    return res.render('index', { restaurant })
  } catch (error) {
    console.log(error)
  }
})

// create page
router.get('/create', (req, res) => {
  return res.render('create')
})

router.get('/search', async (req, res) => {
  try {
    const keyword = req.query.keyword.trim()
    const query = new RegExp(keyword, "i")
    const userId = req.user._id
    const restaurant = await Restaurants.find({ userId, "$or": [{ "name": { $regex: query } }, { "category": { $regex: query } }, { "name_en": { $regex: query } }] }).lean()
    return res.render('index', { restaurant, keyword })
  } catch (error) {
    console.log(error)
  }
})

router.get('/sort', (req, res) => {
  const sortType = req.query.sort
  const selectedSort = toSort(sortType)
  const userId = req.user._id
  Restaurants.find({ userId })
    .lean()
    .sort(selectedSort)
    .then(Restaurants => res.render('index', { restaurant: Restaurants }))
    .catch(error => console.log(error))
})

module.exports = router