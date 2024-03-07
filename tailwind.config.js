module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        extend: {
            colors:{
                'default-color':"#1e293b"
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}