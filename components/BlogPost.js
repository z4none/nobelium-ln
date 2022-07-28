import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'

const BlogPost = ({ post }) => {
  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <a>
        <article key={post.id} className="p-8 mb-8 bg-white border border-gray shadow-sm hover:border-gray-400">
          <header className="flex flex-col justify-between">
            <h2 className="text-lg font-medium mb-2 cursor-pointer font-bold text-black">
              {post.title}
            </h2>
            <time className="flex-shrink-0 text-gray-600">
              {formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}
            </time>
          </header>
          <main>
            <p className="hidden md:block leading-8 text-gray-500">
              {post.summary}
            </p>
          </main>
        </article>
      </a>
    </Link>
  )
}

export default BlogPost
