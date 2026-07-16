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

export const getAntdTheme = (scheme) => ({
  algorithm: scheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: scheme === 'dark' ? PRIMITIVES.indigo300 : PRIMITIVES.indigo500,
    colorBgContainer: scheme === 'dark' ? PRIMITIVES.gray900 : PRIMITIVES.white,
    colorBgLayout: scheme === 'dark' ? PRIMITIVES.gray950 : PRIMITIVES.gray50,
    colorBgElevated: scheme === 'dark' ? PRIMITIVES.gray850 : PRIMITIVES.white,
    colorBorder: scheme === 'dark' ? PRIMITIVES.gray800 : PRIMITIVES.gray200,
    colorBorderSecondary: scheme === 'dark' ? PRIMITIVES.gray700 : PRIMITIVES.gray300,
    colorText: scheme === 'dark' ? PRIMITIVES.gray50 : PRIMITIVES.gray900,
    colorTextSecondary: scheme === 'dark' ? PRIMITIVES.gray400 : PRIMITIVES.gray600,
    colorTextTertiary: scheme === 'dark' ? PRIMITIVES.gray500 : PRIMITIVES.gray400,
    colorError: PRIMITIVES.red500,
    colorWarning: PRIMITIVES.amber500,
    colorSuccess: PRIMITIVES.emerald500,
    borderRadius: 8,
  },
})

export default getAntdTheme
