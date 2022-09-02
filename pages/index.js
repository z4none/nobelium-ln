import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import SiteInfo from '@/components/SiteInfo'
import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps () {
  const posts = await getAllPosts({ includePages: false })
  const tags = getAllTagsFromPosts(posts)
  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
      posts,
      tags
    },
    revalidate: 1
  }
}

const blog = ({ postsToShow, page, showNext, posts, tags }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <div className='grid grid-cols-12 gap-6'>
      <div className='col-span-3 hidden md:block'>
          <SiteInfo className='sticky top-20' postCount={posts.length} tagCount={Object.keys(tags).length}/>
        </div>
        <div className='col-span-12 md:col-span-9'>
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
