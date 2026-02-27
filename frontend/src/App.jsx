import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Logout from './components/Logout'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlog, setNewBlog] = useState(null)
  const [message, setMessage] = useState({ status: null, type: 'success', style: {} })

  const successMessageStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5
  }

  const failureMessageStyle = {
    color: 'red',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setUserToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('logging in with', username, password)
  
    try {
      const user = await loginService.login({ username, password })
  
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      
      blogService.setUserToken(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(prev => ({
        ...prev,
        status: `${user.name} is logged in`,
        style: successMessageStyle
      }))
      setTimeout(() => setMessage({...message, status: null}), 5000)
    } catch {
      setMessage(prev => ({
        ...prev,
        status: 'wrong username or password',
        style: failureMessageStyle
      }))
      setTimeout(() => setMessage({ ...message, status: null }), 5000)
    }
    
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    console.log(newBlog)
    const response = await blogService.create(newBlog)
    console.log('response of creating new blog', response)
    setBlogs(blogs.concat(response))
    setMessage(prev => ({
      ...prev,
      status: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      style: successMessageStyle
    }))
    setTimeout(() => setMessage({...message, status: null}), 5000)
    
  }

  const loginForm = () => (
    <div>
      <h1>login to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input 
              type='text'
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input 
              type='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button>login</button>
      </form>
    </div>
  )

  const createNew = () => (
  <div>
    <h1>create new</h1>
    <form onSubmit={handleBlogCreation}>
      <div>
        <label>
          title:
          <input 
            type='text'
            onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input 
            type='text'
            onChange={({ target }) => {setNewBlog({...newBlog, author: target.value})}}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input 
            type='text'
            onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
          />
        </label>
      </div>
      <button>create</button>
    </form>
  </div>
  )

  const blogsDisplayed = () => (
    <div>
      <h1>blogs</h1>
      <div className='login-text'>
        <p>{user.name} logged in</p>
        <Logout 
          message={message} 
          user={user}
          messageStyle={failureMessageStyle}
          setMessage={setMessage}
        />
      </div>
      {user && createNew()}
      <ol>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ol>
    </div>
  )

  return (
    <div>
      <Message message={message}/>
      {!user && loginForm()}
      {user && blogsDisplayed()}
    </div>
  )
}

export default App