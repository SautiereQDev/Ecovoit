import {
	StyleSheet,
	TextInput,
	View,
	StyleProp,
	ViewStyle,
	TextInputProps,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";

interface ThemedInputProps extends Omit<TextInputProps, "style"> {
	theme?: "Primary" | "Secondary";
	style?: StyleProp<ViewStyle>;
}

export const ThemedInput = ({
	style,
	theme = "Primary", // Default theme
	...inputProps
}: ThemedInputProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const styles = theme === "Primary" ? primary : secondary;

	return (
		<View style={[styles.container, style]}>
			<TextInput
				cursorColor={Colors.light.inputText}
				style={[styles.input, isFocused && styles.focusedInput]}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...inputProps}
			/>
		</View>
	);
};

const primary = StyleSheet.create({
	container: {
		width: "100%",
	},
	input: {
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
		width: "100%",
		borderRadius: 10,
		backgroundColor: Colors.light.background,
		borderColor: Colors.light.inputText,
	},
	focusedInput: {
		borderColor: Colors.light.primary,
		borderWidth: 2,
	},
});

const secondary = StyleSheet.create({
	container: {
		width: "100%",
	},
	input: {
		borderWidth: 1.5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		width: "100%",
		backgroundColor: Colors.light.background,
		borderColor: Colors.light.inputText,
	},
	focusedInput: {
		borderColor: Colors.light.secondary,
		borderWidth: 2,
	},
});

export default ThemedInput;
