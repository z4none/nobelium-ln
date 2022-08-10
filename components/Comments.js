import BLOG from '@/blog.config'
import Giscus from '@giscus/react'

const Comments = () => {
  return (
    <Giscus
      id="comments"
      {...BLOG.comment.giscus}
    />
  )
}

export default Comments
