module.exports = {
    purge: {
      content: ["_site/**/*.html"],
      options: {
        safelist: [],
      },
    },
    theme: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      maxWidth: {
        'large': '73.125rem',
      },
      maxHeight: {
      'hero': "25.75rem",
      },
      extend: {
        gridTemplateRows: {
          'max-content': "repeat(3, minmax(0, max-content))",
        },
        gridTemplateColumns: {
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
            DEFAULT: "#2B2B2B"
          },
          blue: {
            light: "#2B81BA",
            DEFAULT: "#0064A7"
          }
        },
      },
    },
    variants: {},
    plugins: [],
  };