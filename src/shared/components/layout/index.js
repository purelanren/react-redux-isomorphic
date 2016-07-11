import React, { Component } from 'react'

import { Row, Col } from 'antd'
import Nav from '../nav'

import './layout.less'

class Layout extends Component {
  render () {
    return (
      <Row className="layout">
        <Col
          className="nav-box"
          span="6">
          <Nav />
        </Col>
        <Col
          className="container"
          span="18">
          {this.props.children}
        </Col>
      </Row>
    )
  }
}

export default Layout
