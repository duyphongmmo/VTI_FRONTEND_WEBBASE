import i18n from 'i18next'
import { store } from 'react-notifications-component'

import { NOTIFICATION_TYPE } from '~/common/constants'

const NOTIFICATION_DURATION = 5000

/**
 * Add toast notification
 * @param {string} message
 * @param {string} type Type in NOTIFICATION_TYPE
 * @param {string} title Default is i18n.t("toast.notificationTitle")
 * @param {number} duration Duration in milliseconds
 */
const addNotification = (
  message,
  type = NOTIFICATION_TYPE.INFO,
  title = i18n.t('toast.notificationTitle'),
  duration = NOTIFICATION_DURATION,
) => {
  const convertMessage = (message) => {
    const isBreakLine = message?.includes('\n')
    if (!isBreakLine) {
      return message
    } else {
      const lines = message.split('\n')
      const res = lines.map((line, index) => {
        if (lines.length === index + 1) {
          return <span>{line}</span>
        } else {
          return (
            <>
              <span>{line}</span>
              <br></br>
            </>
          )
        }
      })
      return <>{res}</>
    }
  }
  const res = convertMessage(message)
  if (!message && type === NOTIFICATION_TYPE.ERROR) return
  store.addNotification({
    title: i18n.t(title),
    message: res,
    type: type,
    insert: 'bottom',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeInRight'],
    animationOut: ['animate__animated', 'animate__fadeOutRight'],
    dismiss: {
      duration,
      onScreen: false,
      click: true,
      touch: true,
      showIcon: true,
    },
  })
}

export default addNotification
