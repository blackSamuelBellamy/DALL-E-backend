require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const indexRoutes = require('./src/routes/indexRoutes')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use('/', indexRoutes)
app.listen(PORT, console.log('SERVER ON PORT ' + PORT))