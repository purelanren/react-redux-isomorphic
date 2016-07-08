import React, { Component } from 'react'

import Layout from '../../components/layout'
import Nav from '../../components/nav'

import './home.less'

class Home extends Component {
  render () {
    return (
      <Layout>
        <Nav
          link="/description"
          text="Description" />
        <h1 className="title">Isomorphic</h1>
      </Layout>
    )
  }
}

export default Home
