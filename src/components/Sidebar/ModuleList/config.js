import logo from '~/assets/images/logo.svg'
import logo_2 from '~/assets/images/logo2.svg'
import homeRoute from '~/modules/home/routes'

const modules = [
  {
    path: '/',
    icon: logo,
    icon2: logo_2,
    title: 'Home',
    routes: homeRoute,
  },
]



export default modules
