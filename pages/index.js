import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import SiteInfo from '@/components/SiteInfo'
import { getAllPosts } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps () {
  const posts = await getAllPosts({ includePages: false })
  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

const blog = ({ postsToShow, page, showNext }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-3'>
          <SiteInfo/>
        </div>
        <div className='col-span-9'>
        {postsToShow.map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
        {showNext && <Pagination page={page} showNext={showNext} />}
        </div>
      </div>
    </Container>
  )
}

export default blog
