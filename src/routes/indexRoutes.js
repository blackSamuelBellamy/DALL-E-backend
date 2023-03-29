const express = require('express')
const router = express.Router()
const indexController = require('../controller/index.controller')

router.get('/', indexController.home)
router.post('/api/v1/dalle', indexController.postPrompt)
router.post('/api/v1/post', indexController.storingPost)
router.get('/api/v1/post', indexController.storingGet)

module.exports = router