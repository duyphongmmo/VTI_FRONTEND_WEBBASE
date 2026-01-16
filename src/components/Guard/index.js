import { PropTypes } from 'prop-types'

import { useApp } from '~/common/hooks/useApp'

const Guard = ({ code, fallback, children }) => {
  const { canAccess } = useApp()

  if (canAccess(code)) return children

  if (typeof fallback === 'function') return fallback()

  return fallback
}

Guard.defaultProps = {
  code: '',
  fallback: null,
}

Guard.propTypes = {
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
}

export default Guard
