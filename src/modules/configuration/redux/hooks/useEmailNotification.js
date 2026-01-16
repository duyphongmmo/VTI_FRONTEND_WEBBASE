import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import emailNotificationActs from '../actions/email-notification'

export const useEmailNotification = () => {
  const data = useSelector((state) =>
    get(state, 'configuration.emailNotification'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(emailNotificationActs, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
