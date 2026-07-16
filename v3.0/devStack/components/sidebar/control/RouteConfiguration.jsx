import { MENU_KEYS } from '../constants/MenuKeys'

export const ROUTES = {
  [MENU_KEYS.HOME]: '/',
  [MENU_KEYS.ABOUT]: '/about',
  [MENU_KEYS.MY_PROFILE]: '/profile',
}

export const getRoute = (key) => {
  return ROUTES[key] || '/'
}
export const getKeyFromRoute = (path) => {
  return Object.keys(ROUTES).find((key) => ROUTES[key] === path) || null
}
