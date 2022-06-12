import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = ({ navBarTitle, className }) => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className={className}>
      <div className="title absolute left-0 h-12 items-center flex opacity-0 text-lg text-white translate-x-4">
        {navBarTitle
          ? (
            <p className="">
              {navBarTitle}
            </p>
            )
          : (
            <p className="">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
            )}
      </div>
      <ul className="navbar absolute right-1/2 translate-x-1/2 flex flex-row justify-center items-center h-12 text-white">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
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
        <div className="header-inner h-60" style={{ backgroundImage: 'url(' + BLOG.header_bg + ')' }}></div>
        <div className="navbar-wrapper absolute top-full w-full h-12 shadow-lg">
          <div className="max-w-5xl mx-auto">
            <NavBar navBarTitle={navBarTitle} className="relative" />
          </div>
        </div>
      </div>
      <div className="observer-element h-48 w-full absolute" ref={sentinalRef}></div>
    </>
  )
}

export default Header
