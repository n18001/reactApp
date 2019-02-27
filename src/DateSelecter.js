import React, { Component } from 'react'
import request from 'superagent'

export default class DateSelecter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      year: new Date().getFullYear(),
      cours: 1
    }
  }

  componentDidMount () {
    const url = 'http://api.moemoe.tokyo/anime/v1/master/cours'
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

  createYearOp () {
    const beginYear = this.state.data['1'].year
    const years = [...Array(new Date().getFullYear() + 1).keys()].slice(beginYear)
    const ops = years.map(v => {
      return (
        <option value={v} key={v}
          onChange={e => this.handleYearChange(e)}
        >{v}</option>
      )
    })
    return (
      <select
        onChange={e => this.handleYearChange(e)}
        defaultValue={this.state.year}
      >{ops}</select>
    )
  }

  createCoursOp () {
    const cours = [...Array(5).keys()].slice(1)
    const ops = cours.map(v => {
      return (
        <option value={v} key={v}
          onChange={e => this.handleCoursChange(e)}
        >{v}</option>
      )
    })
    return (
      <select
        onChange={e => this.handleCoursChange(e)}
        defaultValue={this.state.cours}
      >{ops}</select>
    )
  }

  handleYearChange (e) {
    this.setState({ year: e.target.value })
  }

  handleCoursChange (e) {
    this.setState({ cours: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const year = this.state.year
    const cours = this.state.cours
    if (!year || !cours) return
    if (this.props.onSubmit) {
      this.props.onSubmit({
        target: this,
        value: { year, cours }
      })
    }
  }

  render () {
    if (!this.state.data) return null
    const yearSelec = this.createYearOp()
    const coursSelec = this.createCoursOp()
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {yearSelec}
        {coursSelec}
        <input type='submit' />
      </form>
    )
  }
}
