import React from 'react'

import { PropTypes } from 'prop-types'

import { MODAL_MODE } from '~/common/constants'

import BottomActionBar from './BottomActionBar'
import TopActionBar from './TopActionBar'

const ActionBar = ({ variant, ...props }) => {
  if (variant === 'top') return <TopActionBar {...props} />
  return <BottomActionBar {...props} />
}

ActionBar.defaultProps = {
  variant: 'bottom',
}

ActionBar.propTypes = {
  variant: PropTypes.oneOf(['top', 'bottom']),
  children: PropTypes.node,
  sx: PropTypes.shape(),
  onEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.shape]),
  onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.shape]),
  onBack: PropTypes.func,
  onCancel: PropTypes.func,
  mode: PropTypes.oneOf([MODAL_MODE.CREATE, MODAL_MODE.UPDATE]),
  elBefore: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  elAfter: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  saveButtonDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  saveButtonTitle: PropTypes.string,
  fixedPosition: PropTypes.bool,
  status: PropTypes.node,
  statusLabel: PropTypes.string,
  toggler: PropTypes.bool,
}

export default ActionBar
