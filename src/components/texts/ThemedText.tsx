import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { Colors } from '@/constants/Colors';
import { FC, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { fonts } from '@/constants/Fonts';

export type ThemedTextProps = {
	type?: keyof typeof fontType;
	color?: keyof typeof Colors.light;
	style?: any;
	children: any;
};

export const ThemedText: FC<ThemedTextProps> = ({
	type,
	color,
	style,
	children,
	...props
}) => {
	const [loaded, error] = useFonts({
		Inter: require('@/assets/fonts/Inter.ttf'),
		'Inter-italic': require('@/assets/fonts/InterItalic.ttf'),
		'Gabarito-bold': require('@/assets/fonts/Gabarito-Bold.ttf'),
		'Gabarito-medium': require('@/assets/fonts/Gabarito-Medium.ttf'),
	});

	// fonts import
	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync().catch(console.error);
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<Text
			style={[
				fontType[type ?? 'defaultBody'],
				{ color: Colors.light[color ?? 'text'] },
				style,
			]}
			{...props}
		>
			{children}
		</Text>
	);
};

export const fontType = StyleSheet.create({
	defaultBody: fonts.defaultBody,
	bigger: fonts.bigger,
	// @ts-ignore
	italic: fonts.italic,
	// @ts-ignore
	accent: fonts.accent,
	small: fonts.small,
	smaller: fonts.smaller,
	header1: fonts.header1,
	header2: fonts.header2,
	header3: fonts.header3,
	header4: fonts.header4,
	header5: fonts.header5,
	header6: fonts.header6,
});
