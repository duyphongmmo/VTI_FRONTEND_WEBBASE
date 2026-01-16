import { useEffect, useMemo } from 'react'

import { Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { first, isEmpty, map } from 'lodash'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Loading from '~/components/Loading'
import { EMAIL_FUNCTION_TYPE_OPTIONS } from '~/modules/configuration/constants'
import { useEmailNotification } from '~/modules/configuration/redux/hooks/useEmailNotification'
import { searchEmailNotificationApi } from '~/modules/configuration/redux/sagas/email-notification/search'
import { convertFilterParams } from '~/utils'

function FormDialog({
  open,
  onCancel,
  mode,
  tempItem,
  onSuccess = () => {},
  onError = () => {},
}) {
  const { t } = useTranslation(['configuration'])
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { detail, isLoading },
    actions,
  } = useEmailNotification()

  useEffect(() => {
    if (isUpdate && !isEmpty(tempItem)) {
      actions.getEmailNotificationDetailsById(tempItem?.id)
    }
    return () => actions.resetEmailNotificationDetail()
  }, [tempItem])

  const onSubmit = (values) => {
    const payload = {
      ...values,
      id: tempItem?.id,
      emails: values?.emails?.map((email) => email?.trim())?.join(','),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createEmailNotification(payload, onSuccess, onError)
    } else if (isUpdate) {
      actions.updateEmailNotification(payload, onSuccess, onError)
    }
  }

  const initialValues = useMemo(
    () => ({
      type: tempItem?.type || null,
      emails: map(tempItem?.emails, 'name') || [],
      description: detail?.description || '',
    }),
    [detail],
  )

  const onChangeType = async (val, setFieldValue) => {
    const resEmail = await searchEmailNotificationApi({
      filter: convertFilterParams({
        type: val,
      }),
    })
    if (resEmail?.statusCode === 200) {
      const emails = first(resEmail.data?.items)?.emails || []
      setFieldValue('emails', map(emails, 'name'))
      setFieldValue(
        'description',
        first(resEmail.data?.items)?.description || '',
      )
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2,
            }}
          >
            <Button color="grayF4" sx={{ mr: 1 }} onClick={onCancel}>
              {t('general:modal.btnClose')}
            </Button>
            <Button
              variant="outlined"
              color="subText"
              sx={{ mr: 1 }}
              onClick={handleReset}
            >
              {t('general:actionBar.cancel')}
            </Button>
            <Button type="submit">{t('emailNotification.setting')}</Button>
          </Box>
        )
      case MODAL_MODE.UPDATE:
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2,
            }}
          >
            <Button color="grayF4" sx={{ mr: 1 }} onClick={onCancel}>
              {t('general:modal.btnClose')}
            </Button>
            <Button
              variant="outlined"
              color="subText"
              sx={{ mr: 1 }}
              onClick={handleReset}
            >
              {t('general:actionBar.cancel')}
            </Button>
            <Button type="submit">{t('general:common.save')}</Button>
          </Box>
        )
      default:
        break
    }
  }

  return (
    <>
      <Loading open={isLoading} />
      <Dialog
        open={open}
        title={
          isUpdate
            ? t('menu.emailNotificationEdit')
            : t('menu.emailNotificationCreate')
        }
        onCancel={onCancel}
        noBorderBottom
      >
        <Formik
          initialValues={initialValues}
          initialTouched={{
            emails: true,
          }}
          validationSchema={() =>
            Yup.object().shape({
              type: Yup.number()
                .nullable()
                .required(t('general:form.required')),
              emails: Yup.array()
                .min(1, t('general:form.required'))
                .test(_, (value, context) => {
                  const containsLongString = value?.some(
                    (i) => i?.length > TEXTFIELD_REQUIRED_LENGTH.CODE_500.MAX,
                  )
                  if (containsLongString) {
                    return context.createError({
                      path: context.path,
                      message: t('general:form.maxLength', {
                        max: TEXTFIELD_REQUIRED_LENGTH.CODE_500.MAX,
                      }),
                    })
                  }
                  const emails = value?.filter((email) => {
                    const data = email.trim()
                    const regexEmail =
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
                    return !data.match(regexEmail)
                  })
                  if (!isEmpty(emails)) {
                    return context.createError({
                      path: context.path,
                      message: t('general:form.validEmail'),
                    })
                  }
                  return true
                }),
            })
          }
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ handleReset, setFieldValue, values }) => {
            return (
              <Form>
                <Field.Autocomplete
                  name="type"
                  label={t('emailNotification.function')}
                  placeholder={t('emailNotification.function')}
                  options={EMAIL_FUNCTION_TYPE_OPTIONS}
                  getOptionLabel={(opt) => t(opt?.text)}
                  getOptionValue={(opt) => opt?.id}
                  required
                  disabled={isUpdate}
                  onChange={(val) => onChangeType(val, setFieldValue)}
                  sx={{ mt: 2 }}
                />
                <Field.Autocomplete
                  name="emails"
                  label={t('emailNotification.email')}
                  placeholder={t('emailNotification.email')}
                  options={values?.emails}
                  sx={{ mt: 2 }}
                  required
                  freeSolo
                  multiple
                  renderInputValue
                />
                <Field.TextField
                  name="description"
                  label={t('emailNotification.note')}
                  placeholder={t('emailNotification.note')}
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_500.MAX,
                  }}
                  multiline
                  rows={3}
                  sx={{ mt: 2 }}
                />
                {renderActionBar(handleReset)}
              </Form>
            )
          }}
        </Formik>
      </Dialog>
    </>
  )
}
export default FormDialog
