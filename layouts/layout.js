// import Image from 'next/image'
import Container from '@/components/Container'
import TagItem from '@/components/TagItem'
import SiteInfo from '@/components/SiteInfo'
import { NotionRenderer, Equation, Code, Collection, CollectionRow } from 'react-notion-x'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import { useLocale } from '@/lib/locale'
import { useRouter } from 'next/router'
import Comments from '@/components/Comments'

const mapPageUrl = id => {
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}

const Layout = ({
  children,
  blockMap,
  frontMatter,
  emailHash,
  posts,
  tags
}) => {
  const locale = useLocale()
  const router = useRouter()
  return (
    <Container
      layout="blog"
      title={frontMatter.title}
      description={frontMatter.summary}
      // date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
    >
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-3'>
          <SiteInfo className='sticky top-20' postCount={posts.length} tagCount={Object.keys(tags).length}/>
        </div>
        <div className='col-span-9'>
          <article className="bg-white border border-gray p-8">
            <h1 className="text-2xl font-bold text-black">
              {frontMatter.title}
            </h1>
            {frontMatter.type[0] !== 'Page' && (
              <nav className="flex my-6 items-start text-gray-500 items-center">
                <time className="mr-4">
                  {formatDate(frontMatter?.date?.start_date || frontMatter.createdTime)}
                </time>
                {frontMatter.tags && (
                  <div className="flex flex-nowrap max-w-full overflow-x-auto">
                    {frontMatter.tags.map(tag => (
                      <TagItem key={tag} tag={tag} />
                    ))}
                  </div>
                )}
              </nav>
            )}
            {children}
            {blockMap && (
              <div className="-mt-4">
                <NotionRenderer
                  recordMap={blockMap}
                  components={{
                    equation: Equation,
                    code: Code,
                    collection: Collection,
                    collectionRow: CollectionRow
                  }}
                  mapPageUrl={mapPageUrl}
                />
              </div>
            )}
          </article>
          <div className="flex justify-between py-4 font-medium text-gray-500">
            <a>
              <button
                onClick={() => router.push(BLOG.path || '/')}
                className="mt-2 cursor-pointer hover:text-black"
              >
                ← {locale.POST.BACK}
              </button>
            </a>
            <a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-2 cursor-pointer hover:text-black"
              >
                ↑ {locale.POST.TOP}
              </button>
            </a>
          </div>
          <Comments slug={frontMatter.slug} />
        </div>
      </div>
    </Container>
  )
}

export default Layout
