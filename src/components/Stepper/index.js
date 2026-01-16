import * as React from 'react'

import Grid from '@mui/material/Grid'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

export default function HorizontalLinearAlternativeLabelStepper({
  steps,
  activeStep,
}) {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '50%',
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            width: '100%',
            flexGrow: 1,
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  )
}
