import {
	StyleProp,
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
	ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/texts';

interface ThemedInputProps extends Omit<TextInputProps, 'style'> {
	theme?: 'Primary' | 'Secondary' | 'TextArea';
	style?: StyleProp<ViewStyle>;
	label?: string;
	errorMessage?: string;
	hasError?: boolean;
	size?: 'small' | 'medium' | 'large';
	disabled?: boolean;
}

export const ThemedInput = ({
	style,
	theme = 'Primary',
	label,
	errorMessage,
	hasError = false,
	size = 'medium',
	disabled = false,
	...inputProps
}: ThemedInputProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const styles =
		theme === 'Primary'
			? primary
			: theme === 'Secondary'
				? secondary
				: textArea;

	if (disabled) {
		return (
			<View style={[disabledStyle.container, style]}>
				{label && <ThemedText style={disabledStyle.label}>{label}</ThemedText>}
				<TextInput
					cursorColor={Colors.light.inputText}
					style={[
						disabledStyle.input,
						// @ts-ignore
						theme !== 'TextArea' && styles[size],
					]}
					editable={false}
					{...inputProps}
				/>
			</View>
		);
	}

	return (
		<View style={[styles.container, style]}>
			{label && <ThemedText style={styles.label}>{label}</ThemedText>}
			<TextInput
				cursorColor={Colors.light.inputText}
				style={[
					styles.input,
					// @ts-ignore
					theme !== 'TextArea' && styles[size],
					isFocused && styles.focusedInput,
					hasError && styles.errorInput,
				]}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				multiline={theme === 'TextArea'}
				{...inputProps}
			/>
			{hasError && errorMessage && (
				<Text style={styles.errorText}>{errorMessage}</Text>
			)}
		</View>
	);
};

const primary = StyleSheet.create({
	container: {
		width: '100%',
	},
	label: {
		marginBottom: 5,
		color: Colors.light.text,
	},
	input: {
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: Colors.light.background,
		borderColor: Colors.light.inputText,
	},
	focusedInput: {
		borderColor: Colors.light.primary,
		borderWidth: 2,
	},
	errorInput: {
		borderColor: Colors.light.error,
	},
	errorText: {
		color: Colors.light.error,
		marginTop: 5,
	},
	small: {
		height: 40,
		paddingVertical: 5, // Réduire le padding vertical
		paddingHorizontal: 10, // Réduire le padding horizontal
	},
	medium: {
		height: 50,
	},
	large: {
		height: 50,
	},
});

const secondary = StyleSheet.create({
	container: {
		width: '100%',
	},
	label: {
		marginBottom: 5,
		color: Colors.light.text,
	},
	input: {
		borderWidth: 1.5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: Colors.light.background,
		borderColor: Colors.light.inputText,
	},
	focusedInput: {
		borderColor: Colors.light.secondary,
		borderWidth: 2,
	},
	errorInput: {
		borderColor: Colors.light.error,
	},
	errorText: {
		color: Colors.light.error,
		marginTop: 5,
	},
	small: {
		height: 40,
	},
	medium: {
		height: 50,
	},
	large: {
		height: 60,
	},
});

const textArea = StyleSheet.create({
	container: {
		width: '100%',
	},
	label: {
		marginBottom: 5,
		color: Colors.light.text,
	},
	input: {
		borderWidth: 1.5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: Colors.light.background,
		borderColor: Colors.light.inputText,
		height: 100,
		textAlignVertical: 'top',
	},
	focusedInput: {
		borderColor: Colors.light.secondary,
		borderWidth: 2,
	},
	errorInput: {
		borderColor: Colors.light.error,
	},
	errorText: {
		color: Colors.light.error,
		marginTop: 5,
	},
});

const disabledStyle = StyleSheet.create({
	container: {
		width: '100%',
	},
	label: {
		marginBottom: 5,
		color: Colors.light.text,
	},
	input: {
		borderWidth: 1.5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: Colors.light.disabledBackground,
		borderColor: Colors.light.disabledBorder,
	},
	focusedInput: {
		borderColor: Colors.light.secondary,
		borderWidth: 2,
	},
	errorInput: {
		borderColor: Colors.light.error,
	},
	errorText: {
		color: Colors.light.error,
		marginTop: 5,
	},
	small: {
		height: 40,
	},
	medium: {
		height: 50,
	},
	large: {
		height: 60,
	},
});

export default ThemedInput;
