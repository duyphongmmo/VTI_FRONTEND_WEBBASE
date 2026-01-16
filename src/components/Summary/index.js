import { Card, CardContent, Box, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'

import Icon from '~/components/Icon'

const Summary = ({ icon, label, value, onClick, bgcolor, titleColor }) => {
  return (
    <Card
      sx={{
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        bgcolor: bgcolor,
      }}
      onClick={onClick}
    >
      <CardContent
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {icon && (
          <Box
            sx={{
              flex: '0 0 48px',
              width: 48,
              height: 48,
              bgcolor: 'grayF4.main',
              borderRadius: 2,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
            }}
          >
            <Icon name={icon} size={24} />
          </Box>
        )}

        <Box sx={{ flex: 1, textAlign: 'right', overflow: 'hidden' }}>
          <Typography
            sx={{
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1,
              mb: 1,
              color: titleColor,
            }}
          >
            {value}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-line',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {label}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

Summary.defaultProps = {
  value: 0,
}

Summary.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  onClick: PropTypes.func,
}

export default Summary
