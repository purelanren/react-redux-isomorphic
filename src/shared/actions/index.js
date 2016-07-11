import { CALL_API } from '../middlewares/api'

export const GET_DESCRIPTION = '/v2/57838842100000ec02676e48'
export function getDescription () {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        api: GET_DESCRIPTION
      }
    })
  }
}

export const SEND_MESSAGE = 'SEND_MESSAGE'
export function sendMessage (msg) {
  return {
    type: SEND_MESSAGE,
    msg
  }
}

export const GET_LIST = '/v2/578398541000005605676e73'
export function getList () {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        api: GET_LIST
      }
    })
  }
}
