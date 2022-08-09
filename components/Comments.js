import BLOG from '@/blog.config'
import React, { useRef } from 'react'
import useScript from '../lib/useScript'

const Comments = () => {
  const comment = useRef(null)

  useScript({
    url: 'https://utteranc.es/client.js',
    theme: 'github-light',
    issueTerm: 'url',
    repo: BLOG.utterances,
    ref: comment
  })

  return (
    <div className="w-full">
      {
        <div ref={comment}></div>
      }
    </div>
  )
}

export default Comments
