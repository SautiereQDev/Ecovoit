import { StyleSheet, TextInputProps, View, ViewStyle } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors.ts";

type Props = TextInputProps & {
	placeholder: string;
	style?: ViewStyle;
};

export default function TextInput({ placeholder, style }: Readonly<Props>) {
	return (
		<View style={style}>
			<TextInput
				placeholder={placeholder}
				style={styles.inputStyle}
				cursorColor={Colors.light.inputText}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	inputStyle: {
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
		width: "100%",
		borderRadius: 10,
		flex: 1,
	},
});
