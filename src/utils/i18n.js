import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enAuth from '~/assets/locales/en/auth.json'
import enConfiguration from '~/assets/locales/en/configuration.json'
import enGeneral from '~/assets/locales/en/general.json'
import enWmsx from '~/assets/locales/en/wmsx.json'
import jpAuth from '~/assets/locales/jp/auth.json'
import jpConfiguration from '~/assets/locales/jp/configuration.json'
import jpGeneral from '~/assets/locales/jp/general.json'
import jpHome from '~/assets/locales/jp/home.json'
import jpWmsx from '~/assets/locales/jp/wmsx.json'
import viAuth from '~/assets/locales/vi/auth.json'
import viConfiguration from '~/assets/locales/vi/configuration.json'
import viGeneral from '~/assets/locales/vi/general.json'
import viHome from '~/assets/locales/vi/home.json'
import viWmsx from '~/assets/locales/vi/wmsx.json'
import { DEFAULT_LANG, LANG_OPTIONS } from '~/common/constants'

export const resources = {
  [LANG_OPTIONS.VI]: {
    general: viGeneral,
    auth: viAuth,
    configuration: viConfiguration,
    wmsx: viWmsx,
    home: viHome,
  },
  [LANG_OPTIONS.EN]: {
    general: enGeneral,
    auth: enAuth,
    configuration: enConfiguration,
    wmsx: enWmsx,
    home: viHome,
  },
  [LANG_OPTIONS.JP]: {
    general: jpGeneral,
    auth: jpAuth,
    wmsx: jpWmsx,
    configuration: jpConfiguration,
    home: jpHome,
  },
}

const getCurrentLang = () => {
  let language = window.localStorage.getItem('language')

  if (Object.values(LANG_OPTIONS).every((lang) => lang !== language)) {
    window.localStorage.setItem('language', DEFAULT_LANG)
    language = DEFAULT_LANG
  }

  return language
}

i18n.use(initReactI18next).init({
  resources: resources,
  lng: getCurrentLang(),
  fallbackLng: DEFAULT_LANG,
  ns: [
    'general',
    'auth',
    'wmsx',
    'configuration',
  ],
  defaultNS: ['general'],
  interpolation: {
    escapeValue: false,
  },
  debug: false,
  react: {
    useSuspense: true,
    wait: true,
  },
})

export default i18n
