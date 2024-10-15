import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'defaultBody' | 'italic' | 'acccent' | 'small' | 'header1' | 'header2' | 'header3' | 'header4' | 'header5';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'defaultBody',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'defaultBody' ? styles.defaultBody : undefined,
        style,
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
