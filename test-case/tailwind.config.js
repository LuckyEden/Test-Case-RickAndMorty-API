/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true, // Container'ı otomatik olarak ortalar
      padding: '1.5rem', // Container'ın içinde yatay padding ekler
      screens: {
        sm: '100%',       // Küçük ekranlarda genişlik %100
        md: '1280px',     // Orta ekranlarda 1280px
        lg: '1440px',     // Büyük ekranlarda 1440px
        xl: '1680px',     // Ekstra büyük ekranlarda 1680px
        '2xl': '1920px',  // Çok geniş ekranlarda 1920px
        '3xl': '2560px',  // Ultra geniş ekranlarda 2560px
      },
    },

    extend: {
      colors: {
        primary: {
          main: "rgb(32, 35, 41)",
          light: "rgb(39, 43, 51)",
          dark: "rgb(32, 35, 41)",
        },

        secondary: {
          main: "rgb(255, 152, 0)",
          light: "rgb(255, 152, 0)",
          dark: "rgb(255, 152, 0)",
        },

        link: "rgb(51, 51, 51)",
        cGray: "rgb(158, 158, 158)",
        paper: "rgb(60, 62, 68)",
        "paper-light": "rgb(72, 74, 81)",
        "paper-dark": "rgb(48, 50, 56)",
      },
      fontSize: {
        base: ['1.125rem', '1.625'], // 112.5% / 1.625 ayarı
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
      },
    }
  },
  plugins: [],
}