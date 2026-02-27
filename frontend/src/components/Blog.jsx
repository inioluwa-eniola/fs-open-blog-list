const Blog = ({ blog }) => (
  <>
    <li>
      <div>
        {blog.title} 
      </div>
      <div style={{fontStyle: 'italic'}}>
        {blog.author}
      </div>
    </li>  
    <br />
  </>
)

export default Blog