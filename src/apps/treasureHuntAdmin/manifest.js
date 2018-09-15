import Navigation from './containers/Navigation'
import Routes from './containers/Routes'
import rootReducer from './reducers'

export default {
  title: 'Treasure Hunt',
  baseUrl: 'treasure-hunt',
  requiredBackendApps: ['wouso-treasure-hunt'],
  routes: Routes,
  navigation: Navigation,
  reducer: rootReducer
}
