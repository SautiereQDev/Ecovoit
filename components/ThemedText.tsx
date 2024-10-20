import { StyleSheet, Text, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useFonts } from "expo-font";
import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?:
		| "defaultBody"
		| "italic"
		| "accent"
		| "small"
		| "header1"
		| "header2"
		| "header3"
		| "header4"
		| "header5";
	color?: keyof typeof Colors.light;
};

export function ThemedText({
	                           style,
	                           lightColor,
	                           darkColor,
	                           type = "defaultBody",
	                           color = "text",
	                           ...rest
                           }: ThemedTextProps) {

	const textColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		color
	);

	const [loaded, error] = useFonts({
		"Inter": require("../assets/fonts/Inter.ttf"),
		"Inter-italic": require("../assets/fonts/InterItalic.ttf"),
		"Gabarito-bold": require("../assets/fonts/Gabarito-Bold.ttf"),
		"Gabarito-Medium": require("../assets/fonts/Gabarito-Medium.ttf"),
	});

	// fonts import
	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}


	return (
		<Text
			style={[{ color: textColor }, styles[type], style]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	defaultBody: {
		fontFamily: "Inter",
		fontSize: 16,
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
		fontSize: 12,
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
		fontFamily: "Gabarito-medium",
		fontSize: 21,
	},
});