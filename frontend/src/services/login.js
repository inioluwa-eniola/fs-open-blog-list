import axios from 'axios'

const login = async (credentials) => {
  const response = await axios.post('/api/login', credentials)
  console.log('user data', response.data)
  return response.data
}

export default { login }