import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import TagItem from '@/components/TagItem'

const BlogPost = ({ post }) => {
  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <a>
        <article key={post.id} className="p-8 mb-8 bg-white border border-gray shadow-sm hover:border-gray-400">
          <header className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold text-black">
              {post.title}
            </h2>
            <nav className="flex my-6 items-start text-gray-500 items-center">
              <time className="mr-4">
                {formatDate(post?.date?.start_date || post.createdTime)}
              </time>
              {post.tags && (
                <div className="flex flex-nowrap max-w-full overflow-x-auto">
                  {post.tags.map(tag => (
                    <TagItem key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </nav>
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
