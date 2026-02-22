const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const midddleware = require('./utils/middleware')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(midddleware.requestLogger)

app.use('/api/blogs', blogListRouter)

app.use(midddleware.unknownEndpoint)
app.use(midddleware.errorHandler)

module.exports = app


