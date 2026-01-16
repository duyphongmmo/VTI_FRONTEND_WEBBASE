import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import attributeGroupActions from '~/modules/wmsx/redux/actions/attributeGroup'

const useAttributeGroup = () => {
  const data = useSelector((state) => get(state, 'wmsx.attributeGroup'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(attributeGroupActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useAttributeGroup
