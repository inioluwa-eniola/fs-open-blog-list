import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Logout from './components/Logout'
import Message from './components/Message'
import Toggle from './components/Toggle'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
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

  const createLogin = async (loginInfo) => {
    try {
      const user = await loginService.login(loginInfo)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setUserToken(user.token)
      
      setUser(user)
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

  const createBlog = async (newBlog) => {
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
      {
        user && 
        <Toggle buttonLabel='create new blog'>
          <BlogForm createBlog={createBlog}/>
        </Toggle>
      }
      {blogs.sort((itemA, itemB) => itemA.likes - itemB.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} id={blog.id}/>
      )}
    </div>
  )

  return (
    <div>
      <Message message={message}/>
      {
        !user && 
        <Toggle buttonLabel='login'>
          <LoginForm createLogin={createLogin}/> 
        </Toggle>
      }
      {user && blogsDisplayed()}
    </div>
  )
}

export default App