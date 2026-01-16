import { memo } from 'react'

import { WatchWrapper } from '~/components/HookForm'

export default memo(function CheckWatchField({ watch, children, name, index }) {
  if (watch) {
    let fieldName = ''
    if (typeof watch === 'boolean') {
      // watch === boolean watch current name
      fieldName = name
    } else {
      if (Array.isArray(watch)) {
        if (watch[0] === true)
          fieldName = [
            name,
            ...watch.slice(1),
          ] // watch === array && fist child is boolean watch current name and name in array
        else fieldName = watch // watch === array watch name in array
      } else {
        fieldName = `${watch}[${index}]` // watch === string watch element of array
      }
    }
    return (
      <WatchWrapper name={fieldName}>
        {(value) =>
          typeof children === 'function' ? children(value) : children
        }
      </WatchWrapper>
    )
  }
  return typeof children === 'function' ? children({}) : children
})
