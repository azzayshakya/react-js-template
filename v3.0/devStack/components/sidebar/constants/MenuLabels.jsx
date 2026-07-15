export const MENU_LABELS = {
  home: 'Home',
  about: 'About',
  myProfile: 'My Profile',
}

export const getMenuLabel = (key) => {
  return MENU_LABELS[key] || key
}

export default MENU_LABELS
