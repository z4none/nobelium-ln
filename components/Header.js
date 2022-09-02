import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = ({ title, className }) => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className={className}>
      <div className="text-lg flex">
        <p className="title">
          {title}
        </p>

        <ul className="navbar flex flex-row items-center h-12">
          {links.map(
            link =>
              link.show && (
                <li
                  key={link.id}
                  className="block mx-4 whitespace-nowrap"
                >
                  <Link href={link.to}>
                    <a>{link.name}</a>
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
      
    </div>
  )
}

const Header = ({ title, fullWidth }) => {
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (entry && !entry.isIntersecting) {
      navRef.current?.classList.add('sticky-nav')
    } else {
      navRef.current?.classList.remove('sticky-nav')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
  }, [sentinalRef])
  return (
    <>
      <div
        className="header relative m-auto w-full mb-8 bg-gray-500 z-10"
        ref={navRef}
      >
        <div className="header-inner h-60 flex items-center justify-center text-5xl text-white" style={{ background: BLOG.headerBg, textShadow: '0 0 20px rgba(0,0,0,0.5)', letterSpacing: '.05em' }}>
        </div>
        <div className="navbar-wrapper absolute top-full w-full">
          <div className="max-w-7xl mx-auto px-12">
            <NavBar title={title} className="relative" />
          </div>
        </div>
      </div>
      <div className="observer-element h-48 w-full absolute" ref={sentinalRef}></div>
    </>
  )
}

export default Header
