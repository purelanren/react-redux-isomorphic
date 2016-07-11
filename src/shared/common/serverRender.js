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
    const actions = component.WrappedComponent.serverActions
    if (actions) {
      allActions = allActions.concat(actions)
    }
  })
  console.log('allActions', allActions)
  if (allActions.length) {
    return Promise.all(allActions.map(action => dispatch(action())))
  }
  return Promise.resolve(() => {})
}
