import { StyleSheet, Text, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useFonts } from "expo-font";
import { Colors } from "@/constants/Colors";

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
		color,
	);

	// fonts import
	const [fontsLoaded] = useFonts({
		Gabarito: require("@/assets/fonts/Gabarito.ttf"),
		Inter: require("@/assets/fonts/Inter.ttf"),
		"Inter-italic": require("@/assets/fonts/Inter-italic.ttf"),
	});

	if (!fontsLoaded) {
		return <Text>Chargement...</Text>;
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
		fontSize: 18,
	},
	small: {
		fontFamily: "Inter",
		fontSize: 12,
	},
	header1: {
		fontFamily: "Gabarito",
		fontSize: 60.5,
		fontWeight: "bold",
	},
	header2: {
		fontFamily: "Gabarito",
		fontSize: 42,
		fontWeight: "bold",
	},
	header3: {
		fontFamily: "Gabarito",
		fontSize: 38,
		fontWeight: "bold",
	},
	header4: {
		fontFamily: "Gabarito",
		fontSize: 28.5,
		fontWeight: "bold",
	},
	header5: {
		fontFamily: "Gabarito",
		fontSize: 21,
		fontWeight: "bold",
	},
});
