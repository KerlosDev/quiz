/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'], // Add Anton as a custom font
        arabicUI: ['arabicUI', 'sans-serif'],
        arabicUI2: ['arabicUI2', 'sans-serif'],
        arabicUI3: ['arabicUI3', 'sans-serif'],
        abril: ['"Abril Fatface"', 'cursive'], // Custom font name
        Gaza: ['DGGaza', 'sans-serif'],
        rakkas: ['Rakkas', 'sans-serif'], // Add Rakkas font to Tailwind theme

      },
      dropShadow: {
        white: '0 4px 6px rgba(255, 255, 255, 0.5)',
        slate: '0 5px 20px rgba(255, 255, 255, 0.5)',
        yellow2: '0 5px 20px rgba(250,204,21,1)',
        red: '0 2px 50px rgba(245, 86, 85, 0.6)',
        blue: '0 0px 90px rgba(47, 75, 255, 0.6)',
        yellow: '0 10px 70px rgba(250,204,21,1)',
      },
      backgroundImage: {
        'quiz': "url('/brain.jpeg')",
        'quiz2': "url('/brain.jpeg')",
        'paton': "url('/pato.jpg')",
        'daark': "url('/darkpat.jpg')",
        'bio': "url('/bio.jpg')",
        'bio': "url('/bio2.jpg')",
        'noise': "url('/noise.jpg')",
        'shits': "url('/shits.png')",
        'non': "url('/non.png')",
      }
    },
  },
  plugins: [],
};
