import React, { useEffect } from 'react'

import { useTour } from '@reactour/tour'
import { isEmpty } from 'lodash'

import Button from '../Button'

const Tour = ({ tours = [] }) => {
  const { setSteps, setIsOpen, setCurrentStep } = useTour()
  useEffect(() => {
    if (!isEmpty(tours)) {
      setCurrentStep(0)
      setSteps(tours)
    }
  }, [tours])

  return <Button icon="paper" color="grayEE" onClick={() => setIsOpen(true)} />
}

export default Tour
