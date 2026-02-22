const blogListRouter = require('express').Router()
const Blog = require('../models/mongoSchema')


blogListRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogListRouter.post('/', (request, response, next) => {
  const blogList = request.body

  const blog = new Blog({
    title: blogList.title,
    author: blogList.author,
    url: blogList.url,
    likes: blogList.likes
  })

  blog.save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch(error =>  next(error))
})

module.exports = blogListRouter