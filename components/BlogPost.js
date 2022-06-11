import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'

const BlogPost = ({ post }) => {
  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <a>
        <article key={post.id} className="pb-8 mb-8 border-b border-gray-200">
          <header className="flex flex-col justify-between md:flex-row md:items-baseline">
            <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer font-bold text-black dark:text-gray-100">
              {post.title}
            </h2>
            <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
              {formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}
            </time>
          </header>
          <main>
            <p className="hidden md:block leading-8 text-gray-500 dark:text-gray-300">
              {post.summary}
            </p>
          </main>
        </article>
      </a>
    </Link>
  )
}

export default BlogPost
