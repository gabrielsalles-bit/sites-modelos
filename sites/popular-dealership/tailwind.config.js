/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reaproveita as classes slate/emerald/cyan/violet já usadas no app, mas resolvendo
        // o valor via variável CSS — assim toda a cor do site responde ao tema
        // claro/escuro (ver :root / :root.light em index.css) sem editar cada componente.
        prime: {
          500: '#10b981',
          600: '#059669',
        },
        surface: {
          page: 'rgb(var(--surface-page) / <alpha-value>)',
          band: 'rgb(var(--surface-band) / <alpha-value>)',
          footer: 'rgb(var(--surface-footer) / <alpha-value>)',
        },
        slate: {
          50: 'rgb(var(--slate-50) / <alpha-value>)',
          100: 'rgb(var(--slate-100) / <alpha-value>)',
          200: 'rgb(var(--slate-200) / <alpha-value>)',
          300: 'rgb(var(--slate-300) / <alpha-value>)',
          400: 'rgb(var(--slate-400) / <alpha-value>)',
          500: 'rgb(var(--slate-500) / <alpha-value>)',
          600: 'rgb(var(--slate-600) / <alpha-value>)',
          700: 'rgb(var(--slate-700) / <alpha-value>)',
          800: 'rgb(var(--slate-800) / <alpha-value>)',
          900: 'rgb(var(--slate-900) / <alpha-value>)',
          950: 'rgb(var(--slate-950) / <alpha-value>)',
        },
        emerald: {
          300: 'rgb(var(--emerald-300) / <alpha-value>)',
          400: 'rgb(var(--emerald-400) / <alpha-value>)',
          500: 'rgb(var(--emerald-500) / <alpha-value>)',
          600: 'rgb(var(--emerald-600) / <alpha-value>)',
          950: 'rgb(var(--emerald-950) / <alpha-value>)',
        },
        cyan: {
          300: 'rgb(var(--cyan-300) / <alpha-value>)',
          400: 'rgb(var(--cyan-400) / <alpha-value>)',
          500: 'rgb(var(--cyan-500) / <alpha-value>)',
          600: 'rgb(var(--cyan-600) / <alpha-value>)',
          950: 'rgb(var(--cyan-950) / <alpha-value>)',
        },
        violet: {
          300: 'rgb(var(--violet-300) / <alpha-value>)',
          500: 'rgb(var(--violet-500) / <alpha-value>)',
          950: 'rgb(var(--violet-950) / <alpha-value>)',
        },
        ink: 'rgb(var(--ink) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}