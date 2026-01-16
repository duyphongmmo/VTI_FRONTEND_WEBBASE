import React, { useState } from 'react'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material'
import { useTheme } from '@mui/styles'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Avatar } from '~/components/Avatar'
import Button from '~/components/Button'
import NoData from '~/components/NoData'
import { convertUtcDateTimeToLocalTz } from '~/utils'
const Activities = ({ data, sx, dateFormatter, title, ignorePaper }) => {
  const { t } = useTranslation('mmsx')
  const [expanded, setExpanded] = useState(false)
  const theme = useTheme()

  const getName = (item = {}) =>
    item.userName || item.username || t('general:common.system')

  const renderTitle = () => {
    if (title === undefined)
      return (
        <Typography variant="h3" sx={{ mb: 1 }}>
          {t('common.activityReport')}
        </Typography>
      )

    if (typeof title === 'function') return title?.()

    if (typeof title === 'string') {
      if (title === '') return null

      return (
        <Typography variant="h3" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )
    }

    return title
  }
  return (
    <Paper
      sx={{
        ...(ignorePaper
          ? { boxShadow: 'none' }
          : {
              mt: 2,
              p: 1,
            }),
        ...sx,
      }}
    >
      {renderTitle()}

      {!data.length ? (
        <NoData text={t('dataTable.noData')} />
      ) : (
        <List sx={{ p: 0 }}>
          {(data || [])
            .slice(0, expanded ? data?.length : 2)
            .map((item, index) => (
              <ListItem
                alignItems="flex-start"
                key={index}
                disableGutters
                disablePadding
              >
                <ListItemAvatar sx={{ mt: '6px' }}>
                  <Avatar alt="" src="" name={getName(item)} />
                </ListItemAvatar>
                <ListItemText
                  color={theme.palette.text.main}
                  primary={
                    <>
                      <Typography
                        variant="h5"
                        component="span"
                        sx={{ mr: getName(item) ? 1 : 0 }}
                      >
                        {getName(item)}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{
                          '&:before': {
                            content: '""',
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            backgroundColor: theme.palette.text.a8,
                            borderRadius: '50%',
                            marginRight: 1,
                            position: 'relative',
                            top: -1,
                          },
                        }}
                      >
                        {convertUtcDateTimeToLocalTz(
                          item?.createdAt,
                          dateFormatter,
                        )}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      {typeof item?.content === 'function' ? (
                        item.content()
                      ) : (
                        <Typography>{item?.content}</Typography>
                      )}
                      {item?.reason && (
                        <Typography>
                          {t('common.message')}:{' '}
                          <span style={{ color: 'red' }}>{item?.reason}</span>
                        </Typography>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
        </List>
      )}

      {data?.length > 2 && (
        <Button
          variant="text"
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setExpanded(!expanded)}
        >
          {t(expanded ? 'common.seeLess' : 'common.seeMore')}
        </Button>
      )}
    </Paper>
  )
}

Activities.defaultProps = {
  data: [],
  sx: {},
  ignorePaper: false,
}

Activities.propTypes = {
  sx: PropTypes.shape(),
  dateFormatter: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      createdAt: PropTypes.string.isRequired,
      username: PropTypes.string,
      userName: PropTypes.string,
    }),
  ),
  title: PropTypes.node,
  ignorePaper: PropTypes.bool,
}

export default Activities
