import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import deviceLayoutAction from '../actions/device-dashboard'

function useDeviceDashboard() {
  const data = useSelector((state) => get(state, 'mmsx.deviceDashboard'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(deviceLayoutAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useDeviceDashboard
