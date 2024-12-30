import { StyleSheet, Text, TextStyle } from 'react-native';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { useFonts } from 'expo-font';
import { Colors } from '@/src/constants/Colors';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { fonts } from '@/src/constants/Fonts';

export type ThemedTextProps = {
	lightColor?: string;
	darkColor?: string;
	type?: keyof typeof fontType;
	color?: keyof typeof Colors.light;
	style?: any;
	children: any;
};

export function ThemedText({
	style,
	lightColor,
	darkColor,
	children,
	type = 'defaultBody',
	color = 'text',
	...rest
}: ThemedTextProps) {
	const textColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		// @ts-ignore
		color
	);

	const [loaded, error] = useFonts({
		Inter: require('@/src/assets/fonts/Inter.ttf'),
		'Inter-italic': require('@/src/assets/fonts/InterItalic.ttf'),
		'Gabarito-bold': require('@/src/assets/fonts/Gabarito-Bold.ttf'),
		'Gabarito-medium': require('@/src/assets/fonts/Gabarito-Medium.ttf'),
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
		>
			{children}
		</Text>
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
