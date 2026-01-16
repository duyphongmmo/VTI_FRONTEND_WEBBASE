import React, { useEffect } from 'react'

import { Box } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'

const BottomActionBar = ({
  showBtnOnBack,
  onBack,
  onCancel,
  mode,
  sx,
  children,
  elBefore,
  elAfter,
  saveButtonDisabled,
  loading,
  saveButtonTitle,
  fixedPosition,
  onDraft,
}) => {
  const { t } = useTranslation()

  const { setIsBottomActionBarExisted } = useApp()
  const hasBtns = Boolean(mode || onCancel || children || elBefore || elAfter)

  useEffect(() => {
    if (fixedPosition && hasBtns) {
      setIsBottomActionBarExisted(true)

      return () => setIsBottomActionBarExisted(false)
    }
  }, [fixedPosition, hasBtns])

  if (!hasBtns) return null

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        p: 1,
        gap: 1,
        ...(fixedPosition
          ? {
              position: 'fixed',
              bottom: 0,
              right: theme.spacing(2),
              left: 16,
              zIndex: 100,
              background: '#fff',
              transition: 'all .2s ease',
              boxShadow: '0px -5px 30px 2px rgba(0, 0, 0, 0.10)',
              borderRadius: '4px',
            }
          : {}),
        ...sx,

        '&:empty, >:empty': {
          display: 'none',
        },
      })}
    >
      {children ? (
        children
      ) : (
        <>
          {typeof elBefore === 'function' ? elBefore() : elBefore}

          {showBtnOnBack && typeof onBack === 'function' && (
            <Button color="grayF4" onClick={onBack}>
              {t('actionBar.back')}
            </Button>
          )}

          {typeof onCancel === 'function' && (
            <Button variant="outlined" color="subText" onClick={onCancel}>
              {t('actionBar.cancel')}
            </Button>
          )}

          {typeof onDraft === 'function' ? (
            <>
              <Button
                type="submit"
                icon="save"
                disabled={saveButtonDisabled}
                loading={loading}
                onClick={() => onDraft(true)}
              >
                {t('actionBar.draft')}
              </Button>
              <>
                {mode === MODAL_MODE.CREATE && (
                  <Button
                    type="submit"
                    icon="save"
                    disabled={saveButtonDisabled}
                    loading={loading}
                    onClick={() => onDraft(false)}
                  >
                    {saveButtonTitle || t('actionBar.approve')}
                  </Button>
                )}

                {mode === MODAL_MODE.UPDATE && (
                  <Button
                    type="submit"
                    icon="save"
                    disabled={saveButtonDisabled}
                    loading={loading}
                    onClick={() => onDraft(false)}
                  >
                    {saveButtonTitle || t('actionBar.approve')}
                  </Button>
                )}
              </>
            </>
          ) : (
            <>
              {mode === MODAL_MODE.CREATE && (
                <Button
                  type="submit"
                  icon="save"
                  disabled={saveButtonDisabled}
                  loading={loading}
                >
                  {saveButtonTitle || t('actionBar.create')}
                </Button>
              )}

              {mode === MODAL_MODE.UPDATE && (
                <Button
                  type="submit"
                  icon="save"
                  disabled={saveButtonDisabled}
                  loading={loading}
                >
                  {saveButtonTitle || t('actionBar.save')}
                </Button>
              )}
            </>
          )}

          {typeof elAfter === 'function' ? elAfter() : elAfter}
        </>
      )}
    </Box>
  )
}

BottomActionBar.defaultProps = {
  children: null,
  elBefore: null,
  elAfter: null,
  sx: {},
  saveButtonDisabled: false,
  saveButtonTitle: '',
  fixedPosition: true,
}

BottomActionBar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.shape(),
  onBack: PropTypes.func,
  onCancel: PropTypes.func,
  onDraft: PropTypes.func,
  mode: PropTypes.oneOf([MODAL_MODE.CREATE, MODAL_MODE.UPDATE]),
  elBefore: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  elAfter: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  saveButtonDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  saveButtonTitle: PropTypes.string,
  fixedPosition: PropTypes.bool,
}

export default BottomActionBar
