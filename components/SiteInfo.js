import BLOG from '@/blog.config'
import Image from 'next/image'

const SiteInfo = ({ className, postCount, tagCount }) => {
  return (
    <div className={`p-8 mb-8 bg-white border border-gray shadow-sm text-center ${className}` }>
      <div className="mx-auto w-20 h-20">
        <Image src="/v.png" alt="" />
      </div>
      <p className="mt-4">
        {BLOG.title}
      </p>
      <p className="mt-2">
        {BLOG.description}
      </p>
      <div className='flex mt-4'>
        <div className='flex-1'>
          <div>POSTS</div>
          <div className='text-2xl'>
            {postCount}
          </div>
        </div>
        <div className='flex-1'>
          <div>TAGS</div>
          <div className='text-2xl'>
            {tagCount}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteInfo
