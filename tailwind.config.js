/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'header-gradient':
          'radial-gradient(27383.93% 123.81% at 0% 25.57%, #E7EDF5 0%, #E7F5F2 100%)',
      },
    },
  },
  plugins: [],
}
