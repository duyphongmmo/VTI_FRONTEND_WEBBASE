import { useCallback, useMemo, useRef } from 'react'

import { isArray, isEmpty, isEqual, isNull, mapKeys, omit } from 'lodash'
import { useHistory, useLocation } from 'react-router-dom'

import qs from '~/utils/qs'

import { ROWS_PER_PAGE_OPTIONS } from '../constants'

export const useQueryState = (
  initialQuery,
  { prefix = '', prefixes = [] } = {},
) => {
  const history = useHistory()
  const { pathname, search } = useLocation()
  const queryObjRef = useRef()

  const pf = useMemo(
    () => (typeof prefix === 'string' ? prefix.trim() : ''),
    [prefix],
  )
  const $page = `${pf}page`
  const $pageSize = `${pf}pageSize`
  const $orderBy = `${pf}orderBy`
  const $order = `${pf}order`
  const $filters = `${pf}filters`
  const $quickFilters = `${pf}quickFilters`
  const $keyword = `${pf}keyword`
  const $tab = `${pf}tab`

  const isJsonString = (str) => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  const jsonParse = (str, fallbackOutput) => {
    if (isJsonString(str)) return JSON.parse(str)
    return fallbackOutput
  }

  const convertObj = useCallback(
    (obj = {}) => {
      const result = { ...obj }
      const keys = [$filters, $quickFilters, $keyword]

      keys.forEach((key) => {
        if (isNull(obj[key]) || isEqual(obj[key], {})) {
          result[key] = null
        } else if (result[key] !== undefined) {
          result[key] = JSON.stringify(obj[key])
        }
      })

      return result
    },
    [$filters, $quickFilters, $keyword],
  )

  const queryObj = useMemo(() => {
    let result
    if (!search && !!initialQuery) {
      result = mapKeys(initialQuery, (v, k) => `${pf}${k}`)
      result = convertObj(result)
    } else if (search && initialQuery && initialQuery?.qs) {
      if (qs.parse(search)[`${pf}qs`]) {
        result = qs.parse(search)
      } else {
        result = mapKeys(initialQuery, (v, k) => `${pf}${k}`)
        result = convertObj({ ...result, ...qs.parse(search) })
      }
    } else {
      result = qs.parse(search)
    }

    if (!isEqual(result, queryObjRef.current)) {
      queryObjRef.current = result
    }

    return queryObjRef.current
  }, [search, initialQuery, queryObjRef.current])

  const page = useMemo(() => queryObj[$page] || 1, [queryObj, $page])
  const pageSize = useMemo(
    () =>
      ROWS_PER_PAGE_OPTIONS.includes(queryObj[$pageSize])
        ? queryObj[$pageSize]
        : ROWS_PER_PAGE_OPTIONS[1],
    [queryObj, $pageSize],
  )

  const sort = useMemo(
    () =>
      queryObj[$orderBy] && queryObj[$order]
        ? { orderBy: queryObj[$orderBy], order: queryObj[$order] }
        : null,
    [queryObj, $orderBy, $order],
  )

  const filters = useMemo(
    () => jsonParse(queryObj[$filters], {}) || {},
    [queryObj, $filters],
  )
  const quickFilters = useMemo(
    () => jsonParse(queryObj[$quickFilters], {}) || {},
    [queryObj, $quickFilters],
  )
  const keyword = useMemo(
    () => jsonParse(queryObj[$keyword], '') || '',
    [queryObj, $keyword],
  )
  const tab = useMemo(
    () => queryObj[$tab] ?? initialQuery?.tab,
    [queryObj, $tab, initialQuery],
  )

  const currentQuery = useMemo(() => {
    const rest = omit(queryObj, [
      $page,
      $pageSize,
      $order,
      $orderBy,
      $filters,
      $quickFilters,
      $keyword,
      $tab,
    ])

    return {
      [$page]: page,
      [$pageSize]: pageSize,
      [$order]: sort?.order,
      [$orderBy]: sort?.orderBy,
      [$filters]: filters,
      [$quickFilters]: quickFilters,
      [$keyword]: keyword,
      [$tab]: tab,
      ...rest,
    }
  }, [
    $page,
    $pageSize,
    $order,
    $orderBy,
    $filters,
    $quickFilters,
    $keyword,
    $tab,
    page,
    pageSize,
    sort,
    filters,
    quickFilters,
    keyword,
    tab,
  ])

  const updateUrl = useCallback(
    (obj = {}) => {
      const combinedObj = {
        ...(!search && !!initialQuery
          ? mapKeys(initialQuery, (v, k) => `${pf}${k}`)
          : {}),
        ...currentQuery,
        ...obj,
      }

      if (combinedObj[$keyword] === '') delete combinedObj[$keyword]
      if (combinedObj[$tab] === '') delete combinedObj[$tab]
      if (combinedObj[$page] === 1) delete combinedObj[$page]
      if (
        combinedObj[$pageSize] === ROWS_PER_PAGE_OPTIONS[1] &&
        !initialQuery?.pageSize
      )
        delete combinedObj[$pageSize]

      const convertedObj = convertObj(combinedObj)

      const newSearch = qs.stringify(convertedObj, {
        skipNull: true,
        skipEmptyString: true,
      })
      history.push(`${pathname}?${newSearch}`)
    },
    [
      pathname,
      search,
      initialQuery,
      currentQuery,
      $keyword,
      $tab,
      $page,
      $pageSize,
      convertObj,
    ],
  )
  const setPage = useCallback(
    (payload) => updateUrl({ [$page]: payload }),
    [updateUrl, $page],
  )
  const setPageSize = useCallback(
    (payload) => updateUrl({ [$pageSize]: payload, [$page]: 1 }),
    [updateUrl, $pageSize, $page],
  )
  const setSort = useCallback(
    (payload) =>
      updateUrl({
        [$orderBy]: payload?.orderBy,
        [$order]: payload?.order,
        [$page]: 1,
      }),
    [updateUrl, $orderBy, $order, $page],
  )
  const setFilters = useCallback(
    (payload) => updateUrl({ [$filters]: payload, [$page]: 1 }),
    [updateUrl, $filters, $page],
  )
  const setQuickFilters = useCallback(
    (payload) => updateUrl({ [$quickFilters]: payload, [$page]: 1 }),
    [updateUrl, $quickFilters, $page],
  )
  const setKeyword = useCallback(
    (payload) => updateUrl({ [$keyword]: payload, [$page]: 1 }),
    [updateUrl, $keyword, $page],
  )
  const setTab = useCallback(
    (payload) => updateUrl({ [$tab]: payload, [$page]: 1 }),
    [updateUrl, $tab, $page],
  )

  const setMultiple = (payload = {}) => {
    const obj = mapKeys(payload, (v, k) => `${pf}${k}`)
    updateUrl({ ...obj, [$page]: 1 })
  }

  const withSearch = useCallback(
    (path = '', { omitPrefixKeys = false, omitSpecificKeys = [] } = {}) => {
      let newSearch = qs.omit(search, 'cloneId')

      if (omitPrefixKeys && isEmpty(prefixes)) {
        newSearch = qs.omit(newSearch, [
          $page,
          $pageSize,
          $orderBy,
          $order,
          $filters,
          $quickFilters,
          $keyword,
          $tab,
        ])
      }

      if (omitPrefixKeys && !isEmpty(prefixes)) {
        prefixes.forEach((prefix) => {
          newSearch = qs.omit(newSearch, [
            `${prefix}page`,
            `${prefix}pageSize`,
            `${prefix}orderBy`,
            `${prefix}order`,
            `${prefix}filters`,
            `${prefix}quickFilters`,
            `${prefix}keyword`,
            `${prefix}tab`,
          ])
        })
      }

      if (isArray(omitSpecificKeys) && omitSpecificKeys?.length) {
        newSearch = qs.omit(newSearch, omitSpecificKeys)
      }

      const k = newSearch ? (path.includes('?') ? '&' : '?') : ''

      return `${path}${k}${newSearch}`
    },
    [
      search,
      $page,
      $pageSize,
      $orderBy,
      $order,
      $filters,
      $quickFilters,
      $keyword,
      $tab,
    ],
  )

  const selectedRowsDeps = JSON.stringify({
    filters,
    quickFilters,
    keyword,
    tab,
  })

  return {
    page,
    pageSize,
    sort,
    filters,
    quickFilters,
    keyword,
    tab,
    selectedRowsDeps,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    setQuickFilters,
    setKeyword,
    setTab,
    setMultiple,
    withSearch,
  }
}
