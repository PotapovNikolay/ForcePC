/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}", "./public/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            boxShadow: {
                'miniCard': '0px 0px 10px 0px rgba(52, 52, 52, 0.2)',
            },
            fontFamily: {
                'Montserrat': ['"Montserrat"', 'sans-serif']
            },
            animation: {
                'logToLeft': 'logToLeft 1s ease-in-out forwards',
                'regToRight': 'regToRight 1s ease-in-out forwards',
                'regToLeft': 'regToLeft 1s ease-in-out forwards',
                'logToRight': 'logToRight 1s ease-in-out forwards',
                'card4CircleRight': 'card4CircleRight 0.25s ease-in forwards',
                'mainLine': 'mainLine 1s linear infinite;',
                'bounceNew': 'bounceNew 1s infinite;',
                'result': 'result 2s ease-in forwards',
                'resultStartLine': 'result  2s linear forwards',
            },
            keyframes: {
                logToLeft: {
                    '0%': {transform: 'translate(0px,0px)'},
                    '25%': {transform: 'translate(-260px,0px)'},
                    '50%': {zIndex: '0'},
                    '100%': {transform: 'translate(0px,0px)', zIndex: '0'}
                },
                regToRight: {
                    '0%': {transform: 'translate(0px,0px)'},
                    '25%': {transform: 'translate(260px,0px)'},
                    '50%': {zIndex: '10'},
                    '100%': {transform: 'translate(0px,0px)', zIndex: '10'}
                },
                regToLeft: {
                    '0%': {transform: 'translate(0px,0px)', zIndex: '10'},
                    '25%': {transform: 'translate(260px,0px)'}, zIndex: '10',
                    '50%': {zIndex: '0'},
                    '100%': {transform: 'translate(0px,0px)', zIndex: '0'}
                },
                logToRight: {
                    '0%': {transform: 'translate(0px,0px)', zIndex: '0'},
                    '25%': {transform: 'translate(-260px,0px)', zIndex: '0'},
                    '50%': {zIndex: '10'},
                    '100%': {transform: 'translate(0px,0px)', zIndex: '10'}
                },
                card4CircleRight: {
                    '0%': {backgroundImage: 'linear-gradient(90deg, rgba(0,199,141,1) 0%, rgba(51,51,51,1) 25%)'},
                    '25%': {backgroundImage: 'linear-gradient(90deg, rgba(0,199,141,1) 25%, rgba(51,51,51,1) 50%)'},
                    '50%': {backgroundImage: 'linear-gradient(90deg, rgba(0,199,141,1) 50%, rgba(51,51,51,1) 75%)'},
                    '75%': {backgroundImage: 'linear-gradient(90deg, rgba(0,199,141,1) 75%, rgba(51,51,51,1) 100%)'},
                    '100%': {backgroundImage: 'linear-gradient(90deg, rgba(0,199,141,1) 0%, rgba(0,199,141,1) 100%);'},
                },
                mainLine: {
                    '0%': {filter: 'blur(5px)'},
                    '50%': {blur: 'blur(7px)'},
                    '100%': {blur: 'blur(5px)'},
                },
                bounceNew: {
                    '0%': {
                        transform: 'translateX(-25%)', transitionTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
                    },
                    '50%': {
                        transform: 'translateX(0)', transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
                    },
                    '100%': {
                        transform: 'translateX(-25%)', transitionTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
                    },
                },
                result:{
                    '0%': {opacity: 0},
                    '99%': {opacity: 0},
                    '100%': {opacity: 1},
                },
                resultStartLine:{
                    '0%': { transform: 'translate(-60rem,0px)'},
                    '100%': { transform: 'translate(120rem, 0px)'},
                }
            }
        },
    },
    plugins: [require('@tailwindcss/forms'),],
}
