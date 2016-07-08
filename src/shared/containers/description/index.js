import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Layout from '../../components/layout'
import Nav from '../../components/nav'

import { getDescription } from '../../actions'

import './description.less'

class Description extends Component {

  componentWillMount () {
    this.props.getDescription()
  }

  render () {
    return (
      <Layout>
        <Nav
          link="/"
          text="Home" />
        <p className="description">{this.props.description}</p>
      </Layout>
    )
  }
}

Description.propTypes = {
  description: PropTypes.string
}

const mapStateToProps = state => {
  return {
    description: state.description
  }
}

const mapDispatchToprops = dispatch => {
  return {
    getDescription: () => {
      dispatch(getDescription())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(Description)
