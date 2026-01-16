import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Autocomplete as MuiAutocomplete,
  Box,
  ListItemButton,
  Popper as MuiPopper,
  Paper as MuiPaper,
  Typography,
  Divider,
  createFilterOptions,
  InputAdornment,
  IconButton,
} from '@mui/material'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/styles'
import { isArray, isEqual, isNil, last, reverse, uniqWith } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { useDebounce, useVisibility } from '~/common/hooks'
import VirtualList from '~/components/Autocomplete/VirtualList'
import TextField from '~/components/TextField'
import { useClasses } from '~/themes'
import qs from '~/utils/qs'

import Button from '../Button'
import Icon from '../Icon'
import style from './style'

const Autocomplete = ({
  label,
  options = [],
  multiple,
  renderOption,
  asyncRequest,
  asyncRequestHelper,
  asyncRequestDeps,
  noOptionsText,
  loadingText,
  vertical,
  required,
  error,
  helperText,
  getOptionLabel,
  getOptionSubLabel,
  getOptionValue,
  placeholder,
  labelWidth,
  value,
  onChange,
  isOptionEqualToValue,
  uncontrolled,
  dropdownLarger,
  dropdownWidth,
  dropdownHeader,
  quickCreate,
  quickInsert,
  getOptionColor,
  autoHighlight,
  tabToSelect,
  renderInputValue,
  getColorText,
  autoFocus,
  ...props
}) => {
  // turn off autofetch
  const autoFetch = false
  const classes = useClasses(style(getColorText), renderInputValue)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [searchedOptions, setSearchedOptions] = useState([])
  const [persistedOptions, setPersistedOptions] = useState([])
  const [isShowFullTags, setIsShowFullTags] = useState(false)
  const filteredOptsRef = useRef([])
  const anchorRef = useRef()
  const theme = useTheme()

  const isVisible = useVisibility(anchorRef)

  const isAsync = typeof asyncRequest === 'function'
  const hasSubLabel = typeof getOptionSubLabel === 'function'
  const hasColor = typeof getOptionColor === 'function'
  const isQuickInsert = typeof quickInsert === 'function'

  const { t } = useTranslation()
  const debouncedInputValue = useDebounce(inputValue?.trim(), 200)
  const refetchWhen = useDebounce(
    isNil(asyncRequestDeps) ||
      typeof asyncRequestDeps === 'string' ||
      typeof asyncRequestDeps === 'number' ||
      typeof asyncRequestDeps === 'boolean'
      ? asyncRequestDeps
      : qs.stringify(asyncRequestDeps),
    200,
  )
  const _filterOptions = useCallback((options, state) => {
    let result = []

    if (typeof props.filterOptions === 'function') {
      result = props.filterOptions(options, state)
    } else {
      result = createFilterOptions()(options, state)
    }

    filteredOptsRef.current = result || []

    return result
  }, [])

  const onOpen = () => setOpen(true)
  const onClose = () => {
    setOpen(false)

    if (!!inputValue) setInputValue('')
  }

  const isOptEqual = (opt, v) =>
    typeof isOptionEqualToValue === 'function'
      ? isOptionEqualToValue(opt, v)
      : isEqual(getOptionValue(opt), v)

  const parseValue = (val, opts = []) => {
    if (multiple) {
      return opts.filter((opt) => {
        if (isArray(val)) {
          return val?.some((v) => isOptEqual(opt, v))
        }
        return false
      })
    }

    return opts.find((opt) => isOptEqual(opt, val)) || null
  }

  const filterOptions = createFilterOptions({
    stringify: (opt) =>
      hasSubLabel
        ? `${getOptionLabel(opt)}|${getOptionSubLabel(opt)}`
        : getOptionLabel(opt) || '',
  })

  const fetchOptionsFn = async (keyword = '', cb) => {
    setLoading(true)
    try {
      const response = await asyncRequest(keyword.trim())
      let opts = response

      if (response && typeof asyncRequestHelper === 'function') {
        opts = asyncRequestHelper(response, keyword.trim())
      }

      if (!Array.isArray(opts)) {
        opts = []
      }

      cb(opts)
    } catch (e) {
      cb([])
    } finally {
      setLoading(false)
    }
  }

  const persist = (opts) =>
    setPersistedOptions((oldOpts) =>
      uniqWith([...oldOpts, ...opts], isOptEqual),
    )

  const prefetchOptions = () => fetchOptionsFn('', setPersistedOptions)

  const fetchOptions = (keyword) =>
    fetchOptionsFn(keyword, (opts) => {
      setSearchedOptions(opts)
      persist(opts)
    })

  useEffect(() => {
    if (isAsync && debouncedInputValue) {
      fetchOptions(debouncedInputValue)
    }
  }, [debouncedInputValue, isAsync])

  useEffect(() => {
    if (isAsync && (autoFetch || autoFocus)) {
      prefetchOptions()
    }
  }, [isAsync, refetchWhen])

  useEffect(() => {
    if (!isVisible) onClose()
  }, [isVisible])

  const getDisplayedAsyncOptions = () => {
    if (!!inputValue) {
      return searchedOptions
    }

    let arr = persistedOptions
    if (multiple) {
      arr = [
        ...(Array.isArray(value) && value?.length ? value : []),
        ...persistedOptions,
      ]
    } else {
      arr = isQuickInsert
        ? [...persistedOptions]
        : [...(value ? [value] : []), ...persistedOptions]
    }

    return reverse(uniqWith(reverse(arr), isOptEqual))
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && tabToSelect && !multiple) {
      if (isAsync && getDisplayedAsyncOptions()?.length === 1) {
        onChange(getDisplayedAsyncOptions()?.[0])
      }

      if (!isAsync && filteredOptsRef.current?.length === 1) {
        onChange(getOptionValue(filteredOptsRef.current?.[0]))
      }
    }

    if (renderInputValue) {
      //after enter success, clear input value
      if (e.keyCode === 13 && inputValue) {
        setInputValue('')
      }

      //prevent enter trigger delete when input value empty
      if (e.keyCode === 13 && !inputValue) {
        e.preventDefault()
        e.stopPropagation()
      }

      //Enable move left, up, right, down when typing
      if ([37, 38, 39, 40].includes(e.keyCode)) {
        e.stopPropagation()
      }
    }
  }

  const dropdownMinWidth = useMemo(() => {
    if (dropdownWidth) return dropdownWidth
    if (dropdownLarger || hasSubLabel) return 500
    return 0
  }, [dropdownWidth, dropdownLarger, hasSubLabel])

  const renderCustomizedOption = (optProps, opt, selected) => {
    const sx = {
      wordBreak: 'break-word',
      display: 'block !important',
      ...(multiple
        ? {
            pr: '30px !important',
            position: 'relative',
          }
        : {}),
    }

    const icon = multiple && selected && (
      <Icon
        name="check"
        size={16}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      />
    )

    if (typeof renderOption === 'function') {
      return renderOption(optProps, opt, selected, sx, icon)
    }

    return (
      <ListItemButton {...optProps} component="li" sx={sx}>
        <Typography component="span">{getOptionLabel(opt)}</Typography>
        {hasSubLabel && (
          <Typography
            variant="subtitle"
            sx={{
              ml: 0.5,
              opacity: 0.7,
            }}
          >
            - {getOptionSubLabel(opt)}
          </Typography>
        )}
        {hasColor && getOptionColor(opt)}
        {icon}
      </ListItemButton>
    )
  }

  const renderTags = (tags = [], getTagProps) => {
    if (!tags?.length) return null

    if (isShowFullTags) {
      return (
        <>
          {tags.map((tag, index) => (
            <Chip
              title={getOptionLabel(tag)}
              label={getOptionLabel(tag)}
              deleteIcon={
                <IconButton
                  size="small"
                  sx={{ '&:hover': { bgcolor: '#ccc' } }}
                >
                  <Icon name="close" sx={{ width: '8px', height: '8px' }} />
                </IconButton>
              }
              {...getTagProps({ index })}
              {...(tag?.isFixed && { onDelete: null })}
            />
          ))}
          {tags?.length > 1 && (
            <Chip
              classes={{ root: classes.tag }}
              onClick={() => setIsShowFullTags(false)}
              label={<ArrowDropUpIcon fontSize="small" />}
              sx={{
                m: '3px',
                '.MuiChip-label': { display: 'flex', px: '6px' },
              }}
            />
          )}
        </>
      )
    }

    return renderInputValue ? (
      tags.map((option, index) => (
        <Chip
          deleteIcon={
            <IconButton size="small" sx={{ '&:hover': { bgcolor: '#ccc' } }}>
              <Icon name="close" sx={{ width: '8px', height: '8px' }} />
            </IconButton>
          }
          label={option}
          {...getTagProps({ index })}
        />
      ))
    ) : (
      <>
        <Chip
          title={getOptionLabel(last(tags))}
          label={getOptionLabel(last(tags))}
          deleteIcon={
            <IconButton size="small" sx={{ '&:hover': { bgcolor: '#ccc' } }}>
              <Icon name="close" sx={{ width: '8px', height: '8px' }} />
            </IconButton>
          }
          {...getTagProps({ index: tags?.length - 1 })}
          sx={{ maxWidth: '50% !important' }}
          {...(last(tags)?.isFixed && { onDelete: null })}
        />

        {tags?.length > 1 && (
          <Tooltip
            arrow
            placement="top"
            title={
              <ol className={classes.tooltipList}>
                {tags.slice(0, -1)?.map((tag, i) => (
                  <li key={i}>
                    <Typography fontSize={12}>{getOptionLabel(tag)}</Typography>
                  </li>
                ))}
              </ol>
            }
            PopperProps={{
              sx: {
                '.MuiTooltip-tooltip': {
                  p: 0,
                },
              },
            }}
          >
            <Chip
              classes={{ root: classes.tag }}
              label={`+${tags?.length - 1}`}
              onClick={() => {
                setIsShowFullTags(true)
                setInputValue('')
              }}
              sx={{
                '.MuiChip-label': { px: '6px' },
              }}
            />
          </Tooltip>
        )}
      </>
    )
  }

  const Popper = useCallback(
    (popperProps) => (
      <MuiPopper
        {...popperProps}
        placement="bottom-start"
        style={{
          ...popperProps?.style,
          minWidth: `min(${dropdownMinWidth}px, 100vw)`,
        }}
      />
    ),
    [dropdownMinWidth],
  )

  const Paper = useCallback(
    ({ children, ...paperProps }) => (
      <MuiPaper {...paperProps}>
        {dropdownHeader}
        {children}
        {typeof quickCreate === 'function' && (
          <>
            <Divider sx={{ mt: 0 }} />
            <Box sx={{ py: 1, px: 1 }}>
              <Button
                size="small"
                onMouseDown={(e) => {
                  e.stopPropagation()
                  quickCreate()
                }}
                startIcon={<BoltOutlinedIcon />}
                color="secondary"
              >
                {t('autocomplete.quickCreate')}
              </Button>
            </Box>
          </>
        )}
      </MuiPaper>
    ),
    [dropdownHeader, quickCreate],
  )
  useEffect(() => {
    if (autoFocus) onOpen()
  }, [autoFocus])
  return (
    <MuiAutocomplete
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      ref={anchorRef}
      classes={{
        root: multiple ? classes.rootMultiple : classes.root,
        tag: classes.tag,
        listbox: classes.listbox,
        ...(isAsync
          ? { popupIndicatorOpen: classes.popupIndicatorOpenSearch }
          : {}),
        paper: classes.paper,
      }}
      multiple={multiple}
      autoHighlight={autoHighlight}
      renderTags={renderTags}
      {...(dropdownMinWidth ? { PopperComponent: Popper } : {})}
      {...(!!dropdownHeader || typeof quickCreate === 'function'
        ? { PaperComponent: Paper }
        : {})}
      loading={loading}
      loadingText={loadingText || t('autocomplete.loadingText')}
      noOptionsText={noOptionsText || t('autocomplete.noOptionsText')}
      getOptionLabel={(opt) => getOptionLabel(opt) || ''}
      filterOptions={filterOptions}
      renderOption={(p, opt, { selected }) =>
        renderCustomizedOption(
          {
            ...p,
            key: p?.key + p?.['data-option-index'],
          },
          opt,
          selected,
        )
      }
      popupIcon={
        <KeyboardArrowDownIcon sx={{ color: 'rgba(51, 51, 51, 0.4)' }} />
      }
      {...(!autoFetch && isAsync
        ? {
            onOpen: () => {
              prefetchOptions()
              onOpen()
            },
          }
        : {})}
      {...(options?.length > 50 && !props.groupBy
        ? {
            ListboxComponent: VirtualList,
          }
        : {})}
      // eslint-disable-next-line no-unused-vars
      renderInput={({ InputLabelProps, ...params }) => (
        <TextField
          {...params}
          vertical={vertical}
          required={required}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          label={label}
          labelWidth={labelWidth}
          autoFocus={autoFocus}
          labelProps={{
            onClick: () => {
              if (open) onClose()
            },
          }}
          {...(isAsync || multiple
            ? {
                onChange: (e) => {
                  setInputValue(e.target.value)
                },
              }
            : {})}
          onKeyDown={handleKeyDown}
          {...(hasColor && value
            ? {
                InputProps: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        {getOptionColor(value)}
                      </InputAdornment>

                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }
            : {})}
          {...(isQuickInsert && value?.typing
            ? {
                InputProps: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      <InputAdornment position="end" sx={{ mr: -1 }}>
                        <IconButton onClick={() => quickInsert(value)}>
                          <Icon name="add" fill={theme.palette.primary.a9} />
                        </IconButton>
                      </InputAdornment>
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }
            : {})}
        />
      )}
      sx={
        isShowFullTags
          ? {}
          : { 'div.MuiOutlinedInput-root': { flexWrap: 'nowrap' } }
      }
      disableClearable={
        multiple
          ? isNil(value) || isEqual(value, [])
          : isNil(value) || value === '' || isEqual(value, {})
      }
      {...props}
      disableCloseOnSelect={multiple ? true : false}
      {...(isAsync
        ? {
            options: getDisplayedAsyncOptions(),
            filterOptions: (opts) => opts,
            isOptionEqualToValue: (opt, val) => isOptEqual(opt, val),
            ...(multiple
              ? {
                  // async multiple
                  value: value ?? [],
                  onChange: (_, newVal, reason) => {
                    onChange(newVal)
                    if (
                      reason === 'clear' ||
                      (reason === 'removeOption' && !newVal?.length)
                    ) {
                      setInputValue('')
                    }
                  },
                }
              : {
                  // async single
                  value: value ?? null,
                  onChange: (_, newVal) => {
                    onChange(newVal)
                    setInputValue('')
                  },
                }),
          }
        : {
            ...(uncontrolled ? {} : { value: parseValue(value, options) }),
            options,
            filterOptions: _filterOptions,
            onChange: (_, newVal, reason) => {
              if (multiple) {
                onChange(newVal?.map((v) => getOptionValue(v)))
                if (
                  reason === 'clear' ||
                  (reason === 'removeOption' && !newVal?.length)
                ) {
                  setInputValue('')
                }
              } else {
                onChange(getOptionValue(newVal))
              }
            },
            ...(typeof isOptionEqualToValue === 'function'
              ? { isOptionEqualToValue }
              : {}),
          })}
      {...(multiple ? { inputValue } : {})}
    />
  )
}

Autocomplete.defaultProps = {
  label: '',
  multiple: false,
  options: [],
  asyncRequest: null,
  vertical: false,
  required: false,
  error: false,
  helperText: '',
  placeholder: '',
  getOptionLabel: (opt) => opt?.label || '',
  getOptionValue: (opt) => opt,
  onChange: () => {},
  uncontrolled: false,
  dropdownLarger: false,
  dropdownHeader: null,
  autoFetch: true,
  autoHighlight: true,
  tabToSelect: true,
}

Autocomplete.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  multiple: PropTypes.bool,
  renderOption: PropTypes.func,
  asyncRequest: PropTypes.func,
  asyncRequestDeps: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
  ]),
  noOptionsText: PropTypes.node,
  loadingText: PropTypes.node,
  vertical: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  getOptionLabel: PropTypes.func,
  getOptionSubLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  isOptionEqualToValue: PropTypes.func,
  uncontrolled: PropTypes.bool,
  dropdownLarger: PropTypes.bool,
  dropdownWidth: PropTypes.number,
  dropdownHeader: PropTypes.node,
  quickCreate: PropTypes.func,
  quickInsert: PropTypes.func,
  autoFetch: PropTypes.bool,
  getOptionColor: PropTypes.func,
  autoHighlight: PropTypes.bool,
  tabToSelect: PropTypes.bool,
}

export default Autocomplete
