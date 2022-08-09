import BLOG from '@/blog.config'
import '@waline/client/dist/waline.css'

import React, { PureComponent } from 'react'

export default class Comment extends PureComponent {
  constructor (props) {
    super(props)
    this._commentRef = React.createRef()
  }

  async componentDidMount () {
    if (typeof window === 'undefined') {
      return
    }
    if (!this._commentRef.current) {
      return
    }
    const Waline = await import('@waline/client')
    this.Waline = Waline.init({
      el: this._commentRef.current,
      serverURL: BLOG.waline,
      visitor: true,
      path: this.props.slug
    })
  }

  render () {
    return <div id='comment' ref={this._commentRef} />
  }
}
