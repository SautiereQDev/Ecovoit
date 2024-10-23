import { StyleSheet, Text, View } from "react-native";
import fonts from "@/constants/Fonts";

const styles = StyleSheet.create({
	defaultBody: fonts.defaultBody,
	italic: fonts.italic,
	accent: fonts.accent,
	small: fonts.small,
	header1: fonts.header1,
	header2: fonts.header2,
	header3: fonts.header3,
	header4: fonts.header4,
	header5: fonts.header5,
});

export default function FontStylesExample() {
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
