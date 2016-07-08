import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import './nav.less'

class Nav extends Component {
  render () {
    const { link, text } = this.props
    return (
      <div className="nav">
        <Link to={link}>{text}</Link>
      </div>
    )
  }
}

Nav.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
}

export default Nav
