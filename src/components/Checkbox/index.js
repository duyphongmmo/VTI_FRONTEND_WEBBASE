import { useRef } from 'react'

import { FormHelperText } from '@mui/material'
import MuiCheckbox from '@mui/material/Checkbox'

import HotKeys from '../HotKeys'

const Checkbox = (props = {}) => {
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
      <MuiCheckbox
        icon={
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            tabIndex="-1"
            title="CheckBoxOutlineBlank"
            width="24"
            height="24"
          >
            <path d="M 20 4 V 20 H 4 V 4 H 20 M 19 3 H 5 C 3.9 3 3 3.9 3 5 V 19 C 3 20.1 3.9 21 5 21 H 19 C 20.1 21 21 20.1 21 19 V 5 C 21 3.9 20.1 3 19 3 Z"></path>
          </svg>
        }
        {...props}
        inputRef={props.inputRef || inputRef}
      />
      {props.error && !!props.helperText && (
        <FormHelperText error>{props.helperText}</FormHelperText>
      )}
    </HotKeys>
  )
}

Checkbox.defaultProps = {}

Checkbox.propTypes = {}

export default Checkbox
