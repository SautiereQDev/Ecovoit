import {
	StyleSheet,
	TextInput,
	StyleProp,
	TextStyle,
	TextInputProps,
	View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";

type ThemedInputProps = TextInputProps & {
	style?: StyleProp<TextStyle>;
};

export const ThemedInput = ({ style, ...inputProps }: ThemedInputProps) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View style={styles.container}>
			<TextInput
				cursorColor={Colors.light.inputText}
				style={[styles.input, isFocused && styles.focusedInput, style]}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...inputProps}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
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
	},
});

export default ThemedInput;
