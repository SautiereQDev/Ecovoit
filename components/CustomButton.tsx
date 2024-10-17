import {
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText.tsx";
import { Colors } from "@/constants/Colors";

type Props = {
	buttonStyle: StyleProp<ViewStyle>;
	text: string;
	textProps?: {
		type?:
			| "header1"
			| "header2"
			| "header3"
			| "header4"
			| "header5"
			| "small"
			| "italic"
			| "accent"
			| "defaultBody"
			| undefined;
		color: keyof typeof Colors.light;
	};
};

export default function CustomButton({ buttonStyle, text, textProps }: Props) {
	return (
		<TouchableOpacity style={buttonStyle}>
			<ThemedText
				type={textProps?.type ?? "defaultBody"}
				color={textProps?.color}
				style={styles.text} // Separate style for the text
			>
				{text}
			</ThemedText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	text: {
		textAlign: "center",
	},
});
