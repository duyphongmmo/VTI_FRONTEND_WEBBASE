import { combineReducers } from 'redux'

import authReducers from '~/modules/auth/redux/reducers'
import configurationReducers from '~/modules/configuration/redux/reducers'
import wmsxReducers from '~/modules/wmsx/redux/reducers'

export default combineReducers({
  ...authReducers,
  wmsx: wmsxReducers,
  configuration: configurationReducers,
})
