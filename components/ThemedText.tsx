<<<<<<< HEAD
import {StyleSheet, Text, type TextProps} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';
import {useFonts} from 'expo-font';
import {Colors} from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'defaultBody' | 'italic' | 'accent' | 'small' | 'header1' | 'header2' | 'header3' | 'header4' | 'header5';
  color?: keyof typeof Colors.light;
};

export function ThemedText({
 style,
 lightColor,
 darkColor,
 type = 'defaultBody',
 color = 'text',
 ...rest
}: ThemedTextProps) {
  const textColor = useThemeColor({light: lightColor, dark: darkColor}, color);

  // fonts import
  const [fontsLoaded] = useFonts({
    'Gabarito': require('@/assets/fonts/Gabarito.ttf'),
    'Inter': require('@/assets/fonts/Inter.ttf'),
    'Inter-italic': require('@/assets/fonts/Inter-italic.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Chargement...</Text>
  }

  return (
      <Text
          style={[
            {color : textColor},
            styles[type],
            style
          ]}
          {...rest}
      />
  );
}

const styles = StyleSheet.create({
  defaultBody: {
    fontFamily: 'Inter',
    fontSize: 16,
  },
  italic: {
    fontFamily: 'Inter-italic',
    fontStyle: 'italic',
    fontSize: 16,
  },
  accent: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 18,
  },
  small: {
    fontFamily: 'Inter',
    fontSize: 12,
  },
  header1: {
    fontFamily: 'Gabarito',
    fontSize: 60.5,
    fontWeight: 'bold',
  },
  header2: {
    fontFamily: 'Gabarito',
    fontSize: 42,
    fontWeight: 'bold',
  },
  header3: {
    fontFamily: 'Gabarito',
    fontSize: 38,
    fontWeight: 'bold',
  },
  header4: {
    fontFamily: 'Gabarito',
    fontSize: 28.5,
    fontWeight: 'bold',
  },
  header5: {
    fontFamily: 'Gabarito',
    fontSize: 21,
    fontWeight: 'bold',
  },
});
=======
import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = "default",
	...rest
}: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

	return (
		<Text
			style={[
				{ color },
				type === "default" ? styles.default : undefined,
				type === "title" ? styles.title : undefined,
				type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
				type === "subtitle" ? styles.subtitle : undefined,
				type === "link" ? styles.link : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		lineHeight: 24,
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: "600",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: "#0a7ea4",
	},
});
>>>>>>> 8813d1f730969f41f12aaffae9e1d6101eaeb7f4
