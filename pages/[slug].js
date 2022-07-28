import Layout from '@/layouts/layout'
import { getAllPosts, getPostBlocks, getAllTagsFromPosts } from '@/lib/notion'
import BLOG from '@/blog.config'
import { createHash } from 'crypto'

const BlogPost = ({ post, blockMap, emailHash, posts, tags }) => {
  if (!post) return null
  return (
    <Layout
      blockMap={blockMap}
      frontMatter={post}
      emailHash={emailHash}
      posts={posts}
      tags={tags}
    />
  )
}

export async function getStaticPaths () {
  const posts = await getAllPosts({ includePages: true })
  return {
    paths: posts.map(row => `${BLOG.path}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps ({ params: { slug } }) {
  const posts = await getAllPosts({ includePages: true })
  const tags = getAllTagsFromPosts(posts)
  const post = posts.find(t => t.slug === slug)
  const blockMap = await getPostBlocks(post.id)
  const emailHash = createHash('md5')
    .update(BLOG.email)
    .digest('hex')
    .trim()
    .toLowerCase()

  return {
    props: { post, blockMap, emailHash, posts, tags },
    revalidate: 1
  }
}

export default BlogPost
