function getEnv() {
  const JSON5 = require('json5')
  let pub = {}, notion = {}
  try {
    pub = JSON5.parse(process.env.NEXT_PUBLIC_PUB)
  } catch (err) {
    console.log(err.message)
  }
  try {
    notion = JSON5.parse(process.env.NOTION)
  } catch (err) {
    console.log(err.message)
  }
  return {...pub, ...notion}
}

const ENV = getEnv()


const BLOG = {
  title: 'Hello',
  author: 'user',
  email: 'user@somewhere.com',
  link: '',
  description: 'nobelium demo site',
  headerBg: '',
  lang: 'zh-CN', // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  appearance: 'light', // ['light', 'dark', 'auto'],
  font: 'sans-serif', // ['sans-serif', 'serif']
  lightBackground: '#ffffff', // use hex value, don't forget '#' e.g #fffefc
  darkBackground: '#18181B', // use hex value, don't forget '#'
  path: '', // leave this empty unless you want to deploy Nobelium in a folder
  since: '', // If leave this empty, current year will be used.
  postsPerPage: 7,
  sortByDate: false,
  showAbout: true,
  showArchive: true,
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  ogImageGenerateURL: '', // The link to generate OG image, don't end with a slash
  socialLink: '',
  seo: {
    keywords: ['Blog', 'Website', 'Notion'],
    googleSiteVerification: '' // Remove the value or replace it with your own google site verification code
  },
  // notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS！！！
  notionPageId: '',
  notionAccessToken: '', // Useful if you prefer not to make your database public
  analytics: {
    provider: '', // Currently we support Google Analytics and Ackee, please fill with 'ga' or 'ackee', leave it empty to disable it.
    ackeeConfig: {
      tracker: '', // e.g 'https://ackee.craigary.net/tracker.js'
      dataAckeeServer: '', // e.g https://ackee.craigary.net , don't end with a slash
      domainId: '' // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    gaConfig: {
      measurementId: '' // e.g: G-XXXXXXXXXX
    }
  },
  isProd: process.env.VERCEL_ENV === 'production', // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  ...ENV
}

// export default BLOG
module.exports = BLOG
