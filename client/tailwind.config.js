/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#F2C94C', // Golden Yellow
                secondary: '#1A202C', // Slate Blue/Dark
                accent: '#EDF2F7', // Off-white/Gray
                'text-dark': '#1A202C',
                'text-light': '#718096',
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
