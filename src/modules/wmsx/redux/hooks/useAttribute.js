import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import attributeActions from '~/modules/wmsx/redux/actions/attribute'

const useAttribute = () => {
  const data = useSelector((state) => get(state, 'wmsx.attribute'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(attributeActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useAttribute
