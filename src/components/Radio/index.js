import { useRef } from 'react'

import { FormHelperText } from '@mui/material'
import Radio from '@mui/material/Radio'

import HotKeys from '../HotKeys'

const RadioButton = (props = {}) => {
  const inputRef = useRef()

  const handleKeyDown = (e) => {
    const isEnter = e?.keyCode === 13

    if (!props.disabled && isEnter) {
      e.preventDefault()
      e.stopPropagation()

      props.onChange?.({
        target: { checked: !inputRef?.current?.checked },
      })
    }
  }

  return (
    <HotKeys onKeyDown={handleKeyDown}>
      <Radio {...props} inputRef={props.inputRef || inputRef} />
      {props.error && !!props.helperText && (
        <FormHelperText error>{props.helperText}</FormHelperText>
      )}
    </HotKeys>
  )
}

RadioButton.defaultProps = {}

RadioButton.propTypes = {}

export default RadioButton
