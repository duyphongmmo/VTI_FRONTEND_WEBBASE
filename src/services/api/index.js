/* eslint-disable no-param-reassign */
import axios from 'axios'
import { isEmpty } from 'lodash'
import Cookies from 'universal-cookie'

import {
  CONFIG_COOKIES,
  HTTP_STATUS_CODE,
  NOTIFICATION_TYPE,
} from '~/common/constants'
import { logout } from '~/modules/auth/redux/actions/auth'
import { ROUTE } from '~/modules/auth/routes/config'
import store from '~/store'
import { redirectRouter } from '~/utils'
import { validateStatus } from '~/utils/api'
import i18n from '~/utils/i18n'
import addNotification from '~/utils/toast'
const cookies = new Cookies()
// common base instance
const BASE_URL = process.env.REACT_APP_HOST + '/api'

const HEADERS_MULTIPLE_PART = {
  'Content-Type': 'multipart/form-data; boundary=something',
}
const REFRESH_TOKEN_URL = '/v1/auth/token/refresh'

export const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      contentType: 'application/json',
      accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })

  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      if (
        config.url !== REFRESH_TOKEN_URL &&
        (cookies.get('token') || localStorage.getItem('token'))
      ) {
        const token = localStorage.getItem('token') || cookies.get('token')
        config.headers['Authorization'] = `Bearer ${token}`
        config.headers['x-auth-token'] = `Bearer ${token}`
        config.headers['lang'] = i18n.language
      }
      return config
    },
    function (error) {
      // Các trường hợp lỗi 5xx, 4xx, network xử lý ở đây
      // Do something with request error
      return Promise.reject(error)
    },
  )

  // Add a response interceptor
  instance.interceptors.response.use(
    async function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response
      if (validateStatus(response?.status)) {
        if (response?.config?.getHeaders) {
          return { data: response?.data, header: response?.headers }
        }
        return response?.data
      } else if (response?.status === 500) {
        //TODO: hide toast error
        // addNotification(
        //   i18n.t('general:message.unknownError'),
        //   NOTIFICATION_TYPE.ERROR,
        // )
      } else {
        //TODO: hide toast error
        // addNotification('unauthorized', NOTIFICATION_TYPE.ERROR)
      }
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      const response = error?.response
      if (response?.status === HTTP_STATUS_CODE.MAINTENANCE) {
        redirectRouter(ROUTE.MAINTENANCE.PATH)
        return
      }
      if (
        response?.status === 403 &&
        response?.config &&
        !response?.config?._isRefreshBefore &&
        response?.config?.url !== REFRESH_TOKEN_URL &&
        localStorage.getItem('refreshToken')
      ) {
        return refreshAccessToken()
          .then((refresh) => {
            if (refresh.statusCode === 200) {
              axios.defaults.headers.common['Authorization'] =
                refresh.data.accessToken.token
              //save to cookies
              cookies.set(
                'token',
                refresh.data.accessToken.token,
                CONFIG_COOKIES,
              )
              cookies.set(
                'refreshToken',
                refresh.data.refreshToken.token,
                CONFIG_COOKIES,
              )

              // save to localStorage
              localStorage.setItem('token', refresh.data.accessToken.token)
              localStorage.setItem(
                'refreshToken',
                refresh.data.refreshToken.token,
              )
              response.config._isRefreshBefore = true
              return instance(response.config)
            } else {
              startLogout()
            }
          })
          .catch(() => {
            startLogout()
          })
      } else if (response?.status === 401) {
        startLogout()
      } else if (
        !response ||
        (!error.status &&
          !response?.data?.path &&
          isEmpty(response.data?.errors)) ||
        error?.message === 'Network Error'
      ) {
        //@TODO: handle Network Error here
        // console.log('Network Error')
      } else if (
        response?.status === 500 &&
        response?.data?.path &&
        !response.data?.errors
      ) {
        addNotification(response?.data?.message, NOTIFICATION_TYPE.ERROR)
      } else {
        //TODO: hide toast error
        // addNotification(response?.data?.message, NOTIFICATION_TYPE.ERROR)
        return Promise.reject(error)
      }
    },
  )

  return instance
}

export const createApi = (instance) => ({
  instance,

  post: (endpoint, params) => {
    return instance
      .post(endpoint, params, {
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },

  postMultiplePart: (endpoint, params) => {
    return instance
      .post(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },

  get: (endpoint, params = {}, options = {}) => {
    return instance
      .get(endpoint, {
        ...options,
        params: params,
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },

  put: (endpoint, params) => {
    return instance
      .put(endpoint, params, {
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },
  putMultiplePart: (endpoint, params) => {
    return instance
      .put(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },
  patch: (endpoint, params) => {
    return instance
      .patch(endpoint, params, {
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },
  patchMultiplePart: (endpoint, params) => {
    return instance
      .patch(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },
  delete: (endpoint, params) => {
    return instance
      .delete(endpoint, {
        data: params,
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },
})

const instance = createInstance(BASE_URL)

const startLogout = () => {
  store.dispatch(logout())
}

/**
 *
 * @returns {Promise}
 */
export const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem('refreshToken')
  return instance.get(REFRESH_TOKEN_URL, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      'x-auth-token': `Bearer ${refreshToken}`,
    },
  })
}

const api = createApi(instance)

export { api }
