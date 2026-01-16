import React from 'react'

import pick from 'lodash/pick'
import PropTypes from 'prop-types'
import { HotKeys as ReactHotKeys } from 'react-hotkeys'

import { keyMap } from '~/common/constants/keyMap'

const HotKeys = ({ children, handlers, ...rest }) => {
  return (
    <ReactHotKeys
      keyMap={pick(keyMap, Object.keys(handlers))}
      handlers={handlers}
      focused
      {...(!children
        ? {
            attach: document,
            component: 'document-fragment',
          }
        : {})}
      {...rest}
    >
      {children}
    </ReactHotKeys>
  )
}

HotKeys.defaultProps = {
  children: null,
  handlers: {},
}

HotKeys.propTypes = {
  children: PropTypes.node,
  handlers: PropTypes.shape(),
}

export default HotKeys
