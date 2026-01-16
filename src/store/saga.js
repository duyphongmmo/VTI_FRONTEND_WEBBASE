import { fork } from 'redux-saga/effects'

import authSagas from '~/modules/auth/redux/sagas'
import configurationSagas from '~/modules/configuration/redux/sagas'
import wmsxSagas from '~/modules/wmsx/redux/sagas'

export default function* rootSagas() {
  yield fork(authSagas)
  yield fork(wmsxSagas)
  yield fork(configurationSagas)
}
