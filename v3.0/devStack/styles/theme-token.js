import { theme } from 'antd'

export const PRIMITIVES = {
  indigo50: '#f0effd',
  indigo100: '#e0defc',
  indigo300: '#9b95ef',
  indigo500: '#534ab7',
  indigo600: '#4239a0',
  indigo700: '#342d82',
  white: '#ffffff',
  gray50: '#f9f9fb',
  gray100: '#f2f2f5',
  gray200: '#e4e4ea',
  gray300: '#d1d1db',
  gray400: '#a0a0b2',
  gray500: '#70708a',
  gray600: '#555568',
  gray700: '#3a3a4a',
  gray800: '#25252f',
  gray850: '#1c1c24',
  gray900: '#14141b',
  gray950: '#0d0d12',
  red500: '#ef4444',
  amber500: '#f59e0b',
  emerald500: '#10b981',
}

export const getAntdTheme = (scheme) => {
  const isDark = scheme === 'dark'

  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      // Brand
      colorPrimary: isDark ? PRIMITIVES.indigo300 : PRIMITIVES.indigo500,
      colorPrimaryHover: isDark ? PRIMITIVES.indigo100 : PRIMITIVES.indigo600,
      colorPrimaryBg: isDark ? 'rgba(83, 74, 183, 0.15)' : PRIMITIVES.indigo50,

      // Backgrounds
      colorBgLayout: isDark ? PRIMITIVES.gray950 : PRIMITIVES.gray50,
      colorBgContainer: isDark ? PRIMITIVES.gray900 : PRIMITIVES.white,
      colorBgElevated: isDark ? PRIMITIVES.gray850 : PRIMITIVES.white,

      // Text
      colorText: isDark ? PRIMITIVES.gray50 : PRIMITIVES.gray900,
      colorTextSecondary: isDark ? PRIMITIVES.gray400 : PRIMITIVES.gray600,
      colorTextTertiary: isDark ? PRIMITIVES.gray500 : PRIMITIVES.gray400,

      // Borders
      colorBorder: isDark ? PRIMITIVES.gray800 : PRIMITIVES.gray200,
      colorBorderSecondary: isDark ? PRIMITIVES.gray700 : PRIMITIVES.gray300,

      // Status
      colorError: PRIMITIVES.red500,
      colorWarning: PRIMITIVES.amber500,
      colorSuccess: PRIMITIVES.emerald500,

      // Layout defaults
      borderRadius: 8,
      padding: 24,
    },
  }
}

export default getAntdTheme
