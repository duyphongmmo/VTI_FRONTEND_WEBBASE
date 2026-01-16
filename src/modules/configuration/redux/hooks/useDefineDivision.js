import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineDivisionActions from '~/modules/configuration/redux/actions/define-division'

const useDefineDivision = () => {
  const data = useSelector((state) =>
    get(state, 'configuration.defineDivision'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineDivisionActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useDefineDivision
