import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {ThemedText} from './ThemedText';
import {Colors} from '@/constants/Colors';

type Props = {
	buttonStyle: StyleProp<ViewStyle>;
	text: string;
	textProps?: {
		type?: "header1" | "header2" | "header3" | "header4" | "header5" | "small" | "italic" | "accent" | "defaultBody" | undefined;
		color: keyof typeof Colors.light;
	};
}

export default function CustomButton({buttonStyle, text, textProps}: Props) {
	return (
			<View style={buttonStyle}>
				<TouchableOpacity>
					<ThemedText
							type={textProps?.type ?? 'defaultBody'}
							color={textProps?.color}
							style={styles.text} // Separate style for the text
					>
						{text}
					</ThemedText>
				</TouchableOpacity>
			</View>
	);
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
	},
});