import axios from 'axios'

let token 

const setUserToken = (newToken) => {
  token = `Bearer ${newToken}`
  console.log('Token', token)
  return token
}

const getAll = async () => {
  const response = await axios.get('/api/blogs')
  return response.data 
}

const create = async (newBlog) => {
  console.log(newBlog)
  console.log(token)
  const  config = {
    headers: {Authorization: token}
  }
  console.log(config)
  const response = await axios.post('/api/blogs', newBlog, config)
  return response.data
}

export default { setUserToken, getAll, create }