import BLOG from '@/blog.config'
import Vercel from '@/components/Vercel'
const Footer = ({ fullWidth }) => {
  const d = new Date()
  const y = d.getFullYear()
  const from = +BLOG.since
  return (
    <div
      className={'mt-6 flex-shrink-0   w-full bg-gray-700 text-gray-300 transition-all'}
    >
      <div className="mx-auto max-w-7xl px-12 py-8 text-sm leading-6">
        <div className="flex align-baseline justify-between flex-wrap">
          <div></div>
          {/* <div className="-ml-0.5 w-0.5 bg-gray-600"></div> */}
          <div>
            <div className="mb-2">
              copyright © {BLOG.author} {from === y || !from ? y : `${from} - ${y}`}
            </div>
            <div className="mb-3">
              <Vercel/>
            </div>
            <div>
              { BLOG.badge && (<img src={BLOG.badge} alt="counter" className="mb-2 float-right"/>) }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
