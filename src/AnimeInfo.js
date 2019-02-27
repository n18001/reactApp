import React, { Component } from 'react'
import DateSelecter from './DateSelecter'
import AnimeInfoViewer from './AnimeInfoViewer'
import request from 'superagent'

export default class AnimeInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  handleSubmit (e) {
    const year = e.value.year
    const cours = e.value.cours
    const url = `https://api.moemoe.tokyo/anime/v1/master/${year}/${cours}`
    request
      .get(url)
      .end((err, res) => {
        if (err) return console.log(err)
        this.loadedJson(res.body)
      })
  }

  loadedJson (json) {
    if (!json) return console.log('No json data')
    this.setState({ data: json })
  }

  render () {
    return (
      <div className='anime-info'>
        <DateSelecter onSubmit={e => this.handleSubmit(e)} />
        <Viewer data={this.state.data} />
      </div>
    )
  }
}

const Viewer = props => {
  if (!props.data) return null
  const boxes = props.data.map(v => {
    const id = v.id
    const url = v.public_url
    const title = v.title
    return (
      <li key={id}>
        <AnimeInfoViewer url={url} id={id} title={title} />
      </li>
    )
  })
  return (
    <ul>{boxes}</ul>
  )
}
