import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { getCurrentModule } from '~/utils/menu'

export const TextDisplay = ({ route }) => {
  const currentModule = getCurrentModule(route.path)
  const { t } = useTranslation([currentModule])
  return (
    <Typography
      title={t(`menu.${route.name}`)}
      variant="h5"
      color="#fff"
      noWrap
      sx={{
        fontWeight: 400,
      }}
    >
      {t(`menu.${route.name}`)}
    </Typography>
  )
}
