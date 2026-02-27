import React from 'react'

const Logout = ({ message, user, messageStyle, setMessage }) => {
  return (
    <button
      onClick={() => {
        window.localStorage.removeItem('loggedInUser')

        setMessage(prev => ({
          ...prev,
          status: `${user.name} is logged out`,
          style: messageStyle
        }))
        setTimeout(() => setMessage({...message, status: null}), 5000)
      }}
    >logout</button>
  )
}

export default Logout
