import React from 'react'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h1>login to application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input 
              type='text'
              value={username}
              onChange={handleUsernameChange}
              // onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input 
              type='password'
              value={password}
              onChange={handlePasswordChange}
              // onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

export default LoginForm
