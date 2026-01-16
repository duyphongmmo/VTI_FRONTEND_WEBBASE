import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import holonActions from '~/modules/configuration/redux/actions/holon'

const useHolon = () => {
  const data = useSelector((state) => get(state, 'configuration.holon'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(holonActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useHolon
