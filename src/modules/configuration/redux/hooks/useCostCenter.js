import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineCostCenterActions from '~/modules/configuration/redux/actions/define-cost-center'

const useDefineCostCenter = () => {
  const data = useSelector((state) =>
    get(state, 'configuration.defineCostCenter'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineCostCenterActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useDefineCostCenter
