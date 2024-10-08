/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      spacing: {
        '2.5': '0.625rem', 
      },
    },
  },
  plugins: [],
}