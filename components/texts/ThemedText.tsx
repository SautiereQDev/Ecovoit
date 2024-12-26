import { StyleSheet, Text, TextStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useFonts } from 'expo-font';
import { Colors } from '@/constants/Colors';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { fonts } from '@/constants/Fonts';

export type ThemedTextProps = {
	lightColor?: string;
	darkColor?: string;
	type?: keyof typeof fontType;
	color?: keyof typeof Colors.light;
	style?: any;
};

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = 'defaultBody',
	color = 'text',
	...rest
}: ThemedTextProps) {
	const textColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		color
	);

	const [loaded, error] = useFonts({
		Inter: require('@/assets/fonts/Inter.ttf'),
		'Inter-italic': require('@/assets/fonts/InterItalic.ttf'),
		'Gabarito-bold': require('@/assets/fonts/Gabarito-Bold.ttf'),
		'Gabarito-medium': require('@/assets/fonts/Gabarito-Medium.ttf'),
	});

	// fonts import
	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<Text
			style={
				[{ color: textColor }, fontType[type], style] as unknown as TextStyle
			}
			{...rest}
		/>
	);
}

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
	header6: fonts.header5,
});
