import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineSectionActions from '~/modules/configuration/redux/actions/define-section'

const useDefineSection = () => {
  const data = useSelector((state) => get(state, 'configuration.defineSection'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineSectionActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useDefineSection
