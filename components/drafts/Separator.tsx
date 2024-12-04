import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';

export default function Separator({ style }: { style?: StyleProp<ViewStyle> }) {
	return <View style={[styles.default, style]} />;
}

const styles = StyleSheet.create({
	default: {
		height: 0,
		width: '100%',
		borderTopWidth: 1,
		borderColor: '#000',
	},
});
