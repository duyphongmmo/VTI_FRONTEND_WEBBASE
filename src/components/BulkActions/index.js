import React, { useState } from 'react'

import { Divider } from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  BULK_ACTION,
  BULK_ACTION_OPTIONS,
  NOTIFICATION_TYPE,
} from '~/common/constants'
// import Loading from '~/components/Loading'
import { api } from '~/services/api'
import qs from '~/utils/qs'
import addNotification from '~/utils/toast'

import Button from '../Button'
import Dialog from '../Dialog'

const BulkActions = ({ handler, selected, uniqKey }) => {
  const { t } = useTranslation()
  const [action, setAction] = useState(0)
  // const [loading, setLoading] = useState(false)

  const options = BULK_ACTION_OPTIONS.filter((opt) =>
    (handler?.actions || []).includes(opt.value),
  )

  const isOpen = !!action
  const close = () => setAction(0)

  const ids = qs.stringify({ ids: selected.map((item) => item?.[uniqKey]) })

  const idsPayload = { ids: selected.map((item) => item?.[uniqKey]) }

  const approveMultipleApi = () => {
    const uri = `/v1/${handler?.apiUrl}/approve/multiple`
    return api.put(uri, idsPayload)
  }

  const confirmMultipleApi = () => {
    const uri = `/v1/${handler?.apiUrl}/confirm/multiple`
    return api.put(uri, idsPayload)
  }

  const rejectMultipleApi = () => {
    const uri = `/v1/${handler?.apiUrl}/reject/multiple`
    return api.put(uri, idsPayload)
  }

  const deleteMultipleApi = () => {
    const uri = `/v1/${handler?.apiUrl}/multiple?${ids}`
    return api.delete(uri)
  }

  const executeAction = async () => {
    close()
    // setLoading(true)
    try {
      let response

      switch (action) {
        case BULK_ACTION.APPROVE:
          response = await approveMultipleApi()
          break
        case BULK_ACTION.REJECT:
          response = await rejectMultipleApi()
          break
        case BULK_ACTION.DELETE:
          response = await deleteMultipleApi()
          break
        case BULK_ACTION.CONFIRM:
          response = await confirmMultipleApi()
          break
        default:
          break
      }

      if (response?.statusCode === 200) {
        addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
      } else {
        addNotification(
          response?.message || response?.statusText,
          NOTIFICATION_TYPE.ERROR,
        )
      }

      if (typeof handler?.onSuccess === 'function') {
        handler?.onSuccess()
      }
    } catch (e) {
      // @TODO: yen.nguyenhai handle err
    } finally {
      // setLoading(false)
    }
  }

  return (
    <>
      {options.map((opt, idx) => (
        <>
          <Button
            variant="text"
            color="text"
            icon={opt?.icon}
            iconColor={opt?.iconColor}
            onClick={() => setAction(opt?.value)}
            disabled={!selected?.length}
          >
            {`${t(opt?.text)}`}
          </Button>
          {idx < options?.length - 1 && (
            <Divider
              orientation="vertical"
              sx={{ borderColor: '#CBCBCB', height: 24 }}
            />
          )}
        </>
      ))}

      <Dialog
        open={isOpen}
        title={t(`bulkActions.promptTitle${action}`)}
        onCancel={close}
        cancelLabel={t('general:common.no')}
        onSubmit={executeAction}
        submitLabel={t('general:common.yes')}
        noBorderBottom
        {...(action === BULK_ACTION.REJECT || action === BULK_ACTION.DELETE
          ? {
              submitProps: {
                color: 'error',
              },
            }
          : {})}
      >
        {t(`bulkActions.promptContent${action}`, { number: selected.length })}
      </Dialog>

      {/* <Loading open={loading} /> */}
    </>
  )
}

BulkActions.defaultProps = {
  uniqKey: 'id',
  selected: [],
  handler: {},
}

BulkActions.propsTypes = {
  uniqKey: PropTypes.string,
  selected: PropTypes.array,
  handler: PropTypes.shape,
}

export default BulkActions
