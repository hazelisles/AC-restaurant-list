const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

// detail page
router.get('/:id', (req, res) => {
  const { id } = req.params
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))  
})

// receive creation redirect to 首頁
router.post('/', (req, res) => {
  if (!req.body.image) {
    // if no image link use Default image
    req.body.image = 'https://i.pinimg.com/564x/d8/4d/5b/d84d5bbd8f83a7e03193da998c801a9a.jpg'
  }
  return Restaurants.create(req.body)
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})

// edit page
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))  
})

// receive edit redirect to detail page
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const { id } = req.params
  return Restaurants.findById(id)
    .then(r => r.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router