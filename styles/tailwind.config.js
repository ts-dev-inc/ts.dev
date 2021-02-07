module.exports = {
    purge: {
      content: ["_site/**/*.html"],
      options: {
        safelist: ['active'],
      },
    },
    theme: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      extend: {
        width: {
          'guide': '20rem',
          'guide-md': '28.125rem',
        },
        maxWidth: {
          'large': '73.125rem',
          'guide': '20rem',
          'guide-md': '28.125rem',
        },
        maxHeight: {
          'hero': "25.75rem",
        },
        minHeight: {
          'header-mobile': "3.75rem",
          'header': "5rem",
        },
        gridTemplateRows: {
          'equal-3': "repeat(3, 1fr)",
          'max-content': "repeat(3, minmax(0, max-content))",
        },
        gridTemplateColumns: {
          'equal-2': "repeat(2, 1fr)",
          'equal-3': "repeat(3, 1fr)",
          'equal-5': "repeat(5, 1fr)",
        },
        colors: {
          yellow: {
            light: "#FFF385",
            DEFAULT: "#FDE726"
          },
          gray: {
            light: "#333333",
            DEFAULT: "#2B2B2B",
            dark: "#1B1B1B"
          },
          blue: {
            light: "#65C1FF",
            DEFAULT: "#2B81BA"
          }
        },
      },
    },
    variants: {},
    plugins: [],
  };