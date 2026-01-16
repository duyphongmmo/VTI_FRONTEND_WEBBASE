import React from 'react'

import { TourProvider } from '@reactour/tour'

const TourContext = ({ children }) => {
  return (
    <TourProvider
      styles={{
        maskArea: (base) => ({ ...base, rx: 50 }),
        popover: (base) => ({ ...base, borderRadius: 5 }),
        controls: (base) => ({ ...base, marginTop: 30 }),
        close: (base) => ({ ...base, right: 8, top: 8 }),
      }}
    >
      {children}
    </TourProvider>
  )
}

export default TourContext
