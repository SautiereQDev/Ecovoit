import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import CircleButton from '@/components/drafts/CircleButton';
import IconButton from '@/components/drafts/IconButton';
import Map from '@/components/map/Map';

export default function Start() {
	return (
		<View style={[{}, styles.container]}>
			<IconButton
				iconName='close'
				onPress={() => {
					router.back();
				}}
				size='large'
				style={{ position: 'absolute', top: 0, left: 0 }}
			/>
			{/* <CustomInput></CustomInput> */}
			<Map
				style={{
					width: 300,
					height: 300,
					elevation: 10,
					borderRadius: 10,
					overflow: 'hidden',
					marginVertical: 80,
				}}
			/>
			<CircleButton
				iconName='arrow-forward'
				onPress={() => {
					router.navigate('/(app)/(post-trip)/destination');
				}}
				size='large'
				style={{ position: 'absolute', bottom: 10, right: 10 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FDFFFD',
		alignItems: 'center',
	},
});
