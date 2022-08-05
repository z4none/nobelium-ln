import BLOG from '@/blog.config'
import { NotionAPI } from 'notion-client'
import { idToUuid } from 'notion-utils'
import getAllPageIds from './getAllPageIds'
import getPageProperties from './getPageProperties'
import filterPublishedPosts from './filterPublishedPosts'
import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */
export async function getAllPosts ({ includePages = false }) {
  let data
  const postsPath = path.join(process.cwd(), 'posts.json')
  try {
    const content = await fs.readFile(postsPath, 'utf8')
    data = JSON.parse(content)
    console.log(`load data from ${postsPath}`)
  } catch (error) {
    console.log('load data failed')
  }

  if (!data) {
    let id = BLOG.notionPageId
    const authToken = BLOG.notionAccessToken || null
    const api = new NotionAPI({ authToken })
    const response = await api.getPage(id)

    id = idToUuid(id)
    const collection = Object.values(response.collection)[0]?.value
    const collectionQuery = response.collection_query
    const block = response.block
    const schema = collection?.schema

    const rawMetadata = block[id].value

    // Check Type
    if (
      rawMetadata?.type !== 'collection_view_page' &&
      rawMetadata?.type !== 'collection_view'
    ) {
      console.log(`pageId "${id}" is not a database`)
      return null
    } else {
      // Construct Data
      data = []
      const pageIds = getAllPageIds(collectionQuery)
      for (let i = 0; i < pageIds.length; i++) {
        const id = pageIds[i]
        const properties = (await getPageProperties(id, block, schema)) || null

        // Add fullwidth, createdtime to properties
        properties.createdTime = new Date(
          block[id].value?.created_time
        ).toString()
        properties.fullWidth = block[id].value?.format?.page_full_width ?? false

        data.push(properties)
      }
      console.log(`save data to ${postsPath}`)
      fs.writeFile(postsPath, JSON.stringify(data), 'utf8')
    }
  }

  // remove all the the items doesn't meet requirements
  const posts = filterPublishedPosts({ posts: data, includePages })

  // Sort by date
  if (BLOG.sortByDate) {
    posts.sort((a, b) => {
      const dateA = new Date(a?.date?.start_date || a.createdTime)
      const dateB = new Date(b?.date?.start_date || b.createdTime)
      return dateB - dateA
    })
  }

  return posts
}
