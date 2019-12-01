const router = require('express').Router()

const { callback, login, refreshToken } = require('./controllers')

router.get('/api/callback', callback)
router.get('/api/login', login)
router.get('/api/refresh_token', refreshToken)

module.exports = router