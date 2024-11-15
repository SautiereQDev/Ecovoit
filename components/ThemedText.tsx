import { StyleSheet, Text, type TextProps, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useFonts } from "expo-font";
import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { fonts } from "@/constants/Fonts";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: keyof typeof styles;
  color?: keyof typeof Colors.light;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "defaultBody",
  color = "text",
  ...rest
}: ThemedTextProps) {
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color
  );

  const [loaded, error] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
    "Inter-italic": require("../assets/fonts/InterItalic.ttf"),
    "Gabarito-bold": require("../assets/fonts/Gabarito-Bold.ttf"),
    "Gabarito-medium": require("../assets/fonts/Gabarito-Medium.ttf"),
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

  return <Text style={[{ color: textColor }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  defaultBody: fonts.defaultBody,
  italic: fonts.italic,
  accent: fonts.accent,
  small: fonts.small,
  smaller: fonts.smaller,
  header1: fonts.header1,
  header2: fonts.header2,
  header3: fonts.header3,
  header4: fonts.header4,
  header5: fonts.header5,
});

/**
 * Composants d'example pour démontrer différents styles de police.
 * Ce composant rend un ensemble d'éléments Text avec divers styles.
 */
export function FontStylesExample() {
  return (
    <View>
      <Text style={styles.defaultBody}>Default Body Text</Text>
      <Text style={styles.italic}>Italic Text</Text>
      <Text style={styles.accent}>Accent Text</Text>
      <Text style={styles.small}>Small Text</Text>
      <Text style={styles.header1}>Header 1 Text</Text>
      <Text style={styles.header2}>Header 2 Text</Text>
      <Text style={styles.header3}>Header 3 Text</Text>
      <Text style={styles.header4}>Header 4 Text</Text>
      <Text style={styles.header5}>Header 5 Text</Text>
    </View>
  );
}

export default ThemedText;
