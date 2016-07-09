export const serverActions = actions => component => {
  component.serverActions = actions
}

export const loadOnServer = (dispatch, components) => {
  let allActions = []
  components.forEach(component => {
    if (!component ||
      !component.WrappedComponent) {
      return true
    }
    allActions = allActions.concat(component.WrappedComponent.serverActions)
  })
  return Promise.all(allActions.map(action => dispatch(action())))
}
