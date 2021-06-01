const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurants = require('../restaurant')
const User = require('../user')
const { results: restaurants } = require('../../restaurant')

const SEED_USERS = [{
  email: 'user1@example.com',
  password: '12345678'
}, {
  email: 'user2@example.com',
  password: '12345678'
}]

db.once('open', async () => {
  try {
    const hash1 = await bcrypt.hash(SEED_USERS[0].password, 10)
    const hash2 = await bcrypt.hash(SEED_USERS[1].password, 10)
    await User.create({ email: SEED_USERS[0].email, password: hash1 }).then(async (user) => {
      let rest1
      for (let i = 0; i < 3; i++) {
        rest1 = await Object.assign(restaurants[i], { userId: user._id })
        await Restaurants.create(rest1)
      }
    })
    await User.create({ email: SEED_USERS[1].email, password: hash2 }).then(async (user) => {
      let rest2
      for (let i = 3; i < 6; i++) {
        rest2 = await Object.assign(restaurants[i], { userId: user._id })
        await Restaurants.create(rest2)
      }
    })
    console.log('Done!')
    process.exit()
  } catch (error) {
    console.log(error)
  }
})