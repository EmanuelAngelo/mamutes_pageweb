/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '../styles/layers.css'
import 'vuetify/styles'

export default createVuetify({
  theme: {
    defaultTheme: 'system',
    utilities: false,
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#cc1919',
          secondary: '#7a451f',
          background: '#f7f7f7',
          surface: '#ffffff',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#e61919',
          secondary: '#7a451f',
          background: '#0d0d0d',
          surface: '#141414',
        },
      },
    },
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
})
