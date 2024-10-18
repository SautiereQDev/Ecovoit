import {
	ButtonProps,
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText.tsx";
import { Colors } from "@/constants/Colors";

type Props = ButtonProps & {
	buttonStyle?: StyleProp<ViewStyle>;
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
			| "defaultBody";
		color: keyof typeof Colors.light;
	};
};

export default function CustomButton({
	buttonStyle,
	title,
	textProps,
	...restProps
}: Props) {
	return (
		<TouchableOpacity
			style={buttonStyle}
			{...restProps}
		>
			<ThemedText
				type={textProps?.type ?? "accent"}
				color={textProps?.color}
				style={styles.text} // Separate style for the text
			>
				{title}
			</ThemedText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	text: {
		textAlign: "center",
	},
});
