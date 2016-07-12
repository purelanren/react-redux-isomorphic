import React, { Component, PropTypes } from 'react'
import { Button } from 'antd'
import classNames from 'classnames'

import './myButton.less'

class MyButton extends Component {
  render () {
    const { size, ...others } = this.props
    let _size
    switch (size) {
      case 'block':
        _size = 'large'
        break

      default:
        _size = size
        break
    }
    const meyButtonClass = classNames({
      'my-button-block': size === 'block'
    })
    return (
      <Button
        className={meyButtonClass}
        size={_size}
        {...others} />
    )
  }
}

MyButton.propTypes = {
  size: PropTypes.oneOf(['block', 'large', 'small'])
}

export default MyButton
