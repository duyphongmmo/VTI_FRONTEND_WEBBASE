import I18nResource from '../features/i18n'
import Icons from '../features/icons'
import RedirectPage from '../features/redirect'
import { ROUTE } from './config'

const routes = [
  {
    path: ROUTE.REDIRECT.PATH,
    component: RedirectPage,
  },
  {
    path: ROUTE.ICONS.PATH,
    component: Icons,
  },
  {
    path: ROUTE.I18N_RESOURCE.PATH,
    component: I18nResource,
  },
]

export default routes
