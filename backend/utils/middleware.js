const logger = require('./logger')

// don't fully understand this part of the code
const requestLogger = (request, response, next) => {
  console.log('Method', request.method)
  console.log('Path ', request.path)
  console.log('Body ', request.body)
  console.log('---')
  
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'Validation Error') {
    return response.status(400).json({ error: error.message })
  }

  next(errror)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler}