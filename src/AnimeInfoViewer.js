import React, { Component } from 'react'
import fetchp from 'fetch-jsonp'

export default class AnimeInfoViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount () {
    (async () => {
      try {
        const url = `http://api.hitonobetsu.com/ogp/analysis?url=${this.props.url}`
        const res = await fetchp(url)
        const json = await res.json()
        this.loadedJson(json)
      } catch (err) {
        console.log(err)
      }
    })()
  }

  loadedJson (json) {
    if (!json) console.log('No json data')
    this.setState({ data: json })
  }

  createBox () {
    const data = this.state.data
    const img = data.image
    const desc = data.description
    const title = this.props.title
    const noneDisp = img ? '' : 'none-display'
    return (
      <a href={this.props.url}>
        <div className='viewer-box-inner'>
          <h2>{title}</h2>
          <figure className={noneDisp}><img src={img} alt={'a'} /></figure>
          <p>{desc}</p>
        </div>
      </a>
    )
  }

  render () {
    if (!this.state.data) return null
    return (
      <div className='viewer-box'>
        {this.createBox()}
      </div>
    )
  }
}
