import React, { useEffect } from 'react'

import { resources } from '~/utils/i18n'

const I18nResource = () => {
  useEffect(() => {
    window.parent.postMessage(resources, '*')
  }, [])

  return <pre>{JSON.stringify(resources, null, 2)}</pre>
}

export default I18nResource
