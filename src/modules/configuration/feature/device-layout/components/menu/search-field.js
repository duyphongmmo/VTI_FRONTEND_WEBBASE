import React, { useEffect } from 'react'

import { InputAdornment } from '@mui/material'
import { Form, Formik } from 'formik'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { useDebounce } from '~/common/hooks'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'

const SearchField = ({ keyword, quickFilters, placeholder, onSearch }) => {
  const [value, setValue] = React.useState(keyword)
  const debouncedInputValue = useDebounce(value, 300)

  useEffect(() => {
    onSearch(debouncedInputValue, quickFilters)
  }, [debouncedInputValue, quickFilters])

  return (
    <Formik initialValues={{ keyword }} enableReinitialize>
      {() => (
        <Form>
          <Field.TextField
            name="keyword"
            placeholder={placeholder || `...`}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
            startAdornment={
              <InputAdornment position="start" sx={{ mr: 0, pr: 0 }}>
                <Icon
                  name="search"
                  sx={{
                    width: 16,
                    height: 16,
                    pointerEvents: 'none',
                  }}
                />
              </InputAdornment>
            }
            onChange={(e) => {
              setValue(e)
            }}
          />
        </Form>
      )}
    </Formik>
  )
}

export default SearchField
