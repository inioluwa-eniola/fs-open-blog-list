import { useState } from 'react'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'


const Blog = ({ blog, user, id }) => {
  const [maxInfo, setMaxInfo] = useState(false) 
  const [updatedLikes, setUpdatedLikes] = useState(blog.likes)
  
  const changeView = () => {
    setMaxInfo(!maxInfo)
  }

  const getLikes = (likes) => {
    setUpdatedLikes(likes)
  }


  return (
    <div className='blog-container'>
      <div className='blog-min-content'>
        {blog.title} 
        <p style={{fontStyle: 'italic'}}>{blog.author}</p>
        <button onClick={changeView}>{maxInfo ? 'hide' : 'view'}</button>
      </div>
      {maxInfo && <div className='blog-additional-content'>
        <p>{blog.url}</p>
        <div className='likes-section'>
          <p>likes: {updatedLikes}</p>
          <LikeButton 
            blog={blog}
            user={user}
            id={id}
            getLikes={getLikes}
          />
        </div>
        <p>{user.name}</p>
      </div>}
      {blog.user.username === user.username && <DeleteButton blog={blog} />}
    </div>
  )
}

  
export default Blog