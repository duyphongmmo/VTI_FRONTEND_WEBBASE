import React, { Suspense } from 'react'

import LocalizationProvider from '@mui/lab/LocalizationProvider'
import GlobalStyles from '@mui/material/GlobalStyles'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { I18nextProvider } from 'react-i18next'
import ReactNotification from 'react-notifications-component'
import { Provider as ReduxProvider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import { SWRConfig } from 'swr'

import AuthLayout from '~/layouts/Auth'
import PrivateLayout from '~/layouts/Private'
import PublicLayout from '~/layouts/Public'
import authRoutes from '~/modules/auth/routes'
import NotFoundPage from '~/modules/public/features/not-found'
import publicRoutes from '~/modules/public/routes'
import { privateRoutesFlatten } from '~/routes'
import history from '~/services/history'
import store from '~/store'
import theme, { globalStyles } from '~/themes'
import i18n from '~/utils/i18n'

import { AppProvider } from './contexts/AppContext'
import { SocketProvider } from './contexts/SocketContext'
import { default as TourProvider } from './contexts/TourContext'
import { ROUTE } from './modules/auth/routes/config'
import MaintenancePage from './modules/public/features/maintenance-system'
import { getLocale } from './utils'
import { DateFns } from './utils/date-time'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={globalStyles(theme)} />

        <Suspense fallback={() => null}>
          <I18nextProvider i18n={i18n}>
            <ReduxProvider store={store}>
              <SWRConfig
                value={{
                  revalidateOnFocus: false,
                  revalidateOnReconnect: false,
                }}
              >
                <LocalizationProvider
                  dateAdapter={DateFns}
                  locale={getLocale()}
                >
                  <AppProvider>
                    <TourProvider>
                      <SocketProvider>
                        <ReactNotification />

                        <Router history={history}>
                          <Switch>
                            {publicRoutes.map((route) => (
                              <Route
                                key={route.path}
                                path={route.path}
                                render={(props) => (
                                  <PublicLayout>
                                    <route.component {...props} />
                                  </PublicLayout>
                                )}
                                exact
                              />
                            ))}

                            {authRoutes.map((route) => (
                              <Route
                                key={route.path}
                                path={route.path}
                                render={(props) => (
                                  <AuthLayout>
                                    <route.component {...props} />
                                  </AuthLayout>
                                )}
                                exact
                              />
                            ))}

                            {privateRoutesFlatten.map((route) => (
                              <Route
                                key={route.path}
                                path={route.path}
                                render={(props) => (
                                  <PrivateLayout>
                                    <route.component {...props} />
                                  </PrivateLayout>
                                )}
                                exact
                              />
                            ))}
                            <Route
                              key={ROUTE.MAINTENANCE.PATH}
                              path={ROUTE.MAINTENANCE.PATH}
                              component={MaintenancePage}
                            />
                            <Route path="*" component={NotFoundPage} />
                          </Switch>
                        </Router>
                      </SocketProvider>
                    </TourProvider>
                  </AppProvider>
                </LocalizationProvider>
              </SWRConfig>
            </ReduxProvider>
          </I18nextProvider>
        </Suspense>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
