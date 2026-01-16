import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import userManagementActions from '~/modules/configuration/redux/actions/user-management'

const useUserManagement = () => {
  const data = useSelector((state) =>
    get(state, 'configuration.userManagement'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(userManagementActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useUserManagement
