/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                hack: {
                    base: '#0f172a',
                    card: '#1e293b',
                    accent: '#3b82f6',
                    accent2: '#8b5cf6',
                    highlight: '#f43f5e',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            },
            animation: {
                'blob': 'blob 7s infinite',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'text-shimmer': 'text-shimmer 2.5s ease-out infinite alternate',
                'gradient-xy': 'gradient-xy 15s ease infinite',
                'spin-slow': 'spin 8s linear infinite',
                'reverse-spin-slow': 'reverse-spin 12s linear infinite',
                'shine': 'shine 2s infinite',
            },
            keyframes: {
                shine: {
                    '0%': { left: '-125%' },
                    '100%': { left: '125%' },
                },
                'reverse-spin': {
                    'from': { transform: 'rotate(360deg)' },
                    'to': { transform: 'rotate(0deg)' },
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'text-shimmer': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '100% 50%' },
                },
                'gradient-xy': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '400% 400%',
                        'background-position': 'right center'
                    }
                }
            }
        },
    },
    plugins: [],
}
