const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', [check('email').notEmpty().withMessage('請輸入Email！'), check('password').notEmpty().withMessage('請輸入密碼！')], (req, res, next) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    const errors = error.array()
    return res.render('login', { errors, signinemail: req.body.email })
  }
  next()
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ msg: 'Email, Password 及 Confirm Password 為必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ msg: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors, name, email, password, confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ msg: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors, name, email, password, confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name, email, password: hash
      }))
      .then(() => {
        const success = { msg: '註冊成功！' }
        res.render('login', { success })
      })
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router