import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import accountingPeriodActions from '~/modules/wmsx/redux/actions/accounting-period'

const useAccountingPeriod = () => {
  const data = useSelector((state) => get(state, 'wmsx.accountingPeriod'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(accountingPeriodActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useAccountingPeriod
