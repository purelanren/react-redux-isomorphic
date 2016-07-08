import { CALL_API } from '../middlewares/api'

export const GET_DESCRIPTION = '/description'
export function getDescription () {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        api: GET_DESCRIPTION
      }
    })
  }
}
