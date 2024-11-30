export const fontSize = {
	tiny: 10,
	smaller: 12,
	small: 14,
	standard: 18,
	medium: 22,
	large: 26,
	xlarge: 32,
	xxlarge: 40,
	huge: 48,
	giant: 56,
	colossal: 72,
	megasize: 90,
	hyper: 120,
};

export const fonts = {
	defaultBody: {
		fontFamily: "Inter",
		fontSize: 16,
	},
	bigger:{
		fontFamily: "Inter",
		fontSize: 19,
	},
	italic: {
		fontFamily: "Inter-italic",
		fontStyle: "italic",
		fontSize: 16,
	},
	accent: {
		fontFamily: "Inter",
		fontWeight: "bold",
		fontSize: 19,
		letterSpacing: 0.25,
	},
	small: {
		fontFamily: "Inter",
		fontSize: 14,
	},
	smaller: {
		fontFamily: "Inter",
		fontSize: 13,
	},
	header1: {
		fontFamily: "Gabarito-bold",
		fontSize: 70,
	},
	header2: {
		fontFamily: "Gabarito-bold",
		fontSize: 46,
	},
	header3: {
		fontFamily: "Gabarito-bold",
		fontSize: 35.5,
		lineHeight: 45,
	},
	header4: {
		fontFamily: "Gabarito-bold",
		fontSize: 30,
	},
	header5: {
		fontFamily: "Gabarito-medium",
		fontSize: 21,
		letterSpacing: 0.5,
	},
};

export type FontSize = keyof typeof fontSize;
