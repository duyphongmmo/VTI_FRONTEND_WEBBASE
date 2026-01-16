import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { NUMBER_FIELD_REQUIRED_SIZE, TEXTFIELD_ALLOW } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'

const AddItemButton = ({ arrayHelpers, buttonTitle, defaultItem, values }) => {
  const { scrollToBottom } = useApp()
  const { t } = useTranslation()
  const [valid, setValid] = useState({
    error: false,
    helperText: '',
  })

  useEffect(() => {
    if (
      values?.rowQuantity === NUMBER_FIELD_REQUIRED_SIZE.ROW_QUANTITY.DEFAULT
    ) {
      setValid({
        error: false,
        helperText: '',
      })
    }
  }, [values?.rowQuantity])

  const validate = (value) => {
    if (+value < NUMBER_FIELD_REQUIRED_SIZE.ROW_QUANTITY.MIN) {
      setValid({
        error: true,
        helperText: t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.ROW_QUANTITY.MIN,
        }),
      })
    } else if (+value > NUMBER_FIELD_REQUIRED_SIZE.ROW_QUANTITY.MAX) {
      setValid({
        error: true,
        helperText: t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.ROW_QUANTITY.MAX,
        }),
      })
    } else {
      setValid({
        error: false,
        helperText: '',
      })
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      }}
    >
      <Button
        variant="outlined"
        onClick={() => {
          const length = +values?.rowQuantity || 1
          for (var i = 0; i < length; i++) {
            arrayHelpers.push({
              ...defaultItem,
              id: `${new Date().getTime()}index${i}`,
            })
          }
          scrollToBottom()
        }}
        disabled={!!valid?.error || !!valid?.helperText}
      >
        {buttonTitle}
      </Button>
      <Box sx={{ ml: 1 }}>
        <Field.TextField
          name="rowQuantity"
          type="number"
          allow={TEXTFIELD_ALLOW.NUMERIC}
          onChange={(val) => validate(val)}
          error={valid?.error}
          helperText={valid?.helperText}
        />
      </Box>
    </Box>
  )
}

AddItemButton.defaultProps = {
  arrayHelpers: {},
  buttonTitle: '',
  defaultItem: {},
  values: {},
}

AddItemButton.propTypes = {
  arrayHelpers: PropTypes.shape(),
  buttonTitle: PropTypes.string,
  defaultItem: PropTypes.shape(),
  values: PropTypes.shape(),
}

export default AddItemButton
