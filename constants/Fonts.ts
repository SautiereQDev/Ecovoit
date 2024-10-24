export const fonts = {
	defaultBody: {
		fontFamily: "Inter",
		fontSize: 16,
	},
	italic: {
		fontFamily: "Inter-italic",
		fontStyle: "italic" as const,
		fontSize: 16,
	},
	accent: {
		fontFamily: "Inter",
		fontWeight: "bold" as const,
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
		fontSize: 60.5,
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
		fontSize: 28.5,
	},
	header5: {
		fontFamily: "Inter",
		fontSize: 21,
		fontWeight: "bold",
	},
};

export default fonts;
