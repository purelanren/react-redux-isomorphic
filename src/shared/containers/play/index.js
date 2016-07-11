import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Button, Table } from 'antd'
import MyButton from '../../components/my-button'

import { sendMessage, getDescription, getList } from '../../actions'
import { serverActions } from '../../common/serverRender'

import './play.less'

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}]

@serverActions([getList])
class Play extends Component {

  constructor() {
    super()

    this.send = this.send.bind(this)
    this.callApi = this.callApi.bind(this)
  }

  componentWillMount() {
    this.props.getList()
  }

  send () {
    this.props.sendMessage('发出的消息')
  }

  callApi () {
    this.props.getDescription()
  }

  render() {
    const { list, description, message } = this.props
    return (
      <div className="play">
        <Table
          dataSource={list}
          columns={columns} />
        <Button
          size="large"
          type="primary">
          antd
        </Button>
        <p>{message}</p>
        <MyButton
          size="block"
          type="primary"
          onClick={this.send}>
          发送消息
        </MyButton>
        <p>{description}</p>
        <MyButton
          size="block"
          type="primary"
          onClick={this.callApi}>
          发送异步消息
        </MyButton>
      </div>
    )
  }
}

Play.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string,
  list: PropTypes.array
}

const mapStateToProps = state => {
  return {
    message: state.message,
    description: state.description,
    list: state.list
  }
}

const mapDispatchToprops = dispatch => {
  return {
    sendMessage: (msg) => dispatch(sendMessage(msg)),
    getDescription: () => dispatch(getDescription()),
    getList: () => dispatch(getList())
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(Play)
