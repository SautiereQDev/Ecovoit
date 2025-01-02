import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

interface MapHeaderProps {
	inputValue?: string;
}

export const MapHeader = ({ inputValue = '' }: MapHeaderProps) => {
	const handleOnChangeText = (text: string) => {};

	return (
		<View style={styles.header}>
			<TextInput
				cursorColor={'#000'}
				style={styles.input}
				onChangeText={handleOnChangeText}
			>
				{inputValue}
			</TextInput>
		</View>
	);
};

export default MapHeader;

const styles = StyleSheet.create({
	header: {
		height: 100,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#151718',
	},
	input: {
		width: '80%',
		padding: 8,
		backgroundColor: '#FFF',
		borderRadius: 9,
		marginTop: 20,
	},
});
