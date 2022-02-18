module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				bg: { 100: "#D16BA5", 200: "#86A8E7", 300: "#5FFBF1" },
				comp: { 100: "#FFE45C", 200: "#FFDD33" },
				card: { 100: "#BBCDF2" },
			},
		},
	},
	plugins: [],
};
