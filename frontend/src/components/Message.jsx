import React from 'react'

const Message = ({ message }) => {

  if (message.status === null) {
    return null
  }

  return (
    <div className='message' style={message.style}>
      <p>{message.status}</p>
    </div>
  )
}

export default Message
