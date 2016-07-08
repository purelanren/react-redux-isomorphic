import dev from './configureStore.dev'
import prod from './configureStore.prod'

let configureStore = dev
if (__PRODUCTION__) {
  configureStore = prod
}

export default configureStore
