/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./index.html"
	],
	theme: {
		extend: {
			fontFamily: {
				'title': ['"Roboto"', 'sans-serif'],
				'body': ['"Nunito"', 'sans-serif'],
			},
			colors: {
				black: '#000',
				white: '#fff',
				primary: '#FF4405',
				"primary-dark": "#e53900",
				"primary-light": "#ffece6",
				background: '#fafaff',
				success: '#0b6e4f',
				info: '#00bcbf',
				warning: '#f95738',
				danger: '#dd1c1a',
				standout: '#ff0'
			},
		},
	},
	plugins: [],
}

