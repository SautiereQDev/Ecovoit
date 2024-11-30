import { StyleSheet, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedInput, CustomButton } from "@/components";
import React, { useState } from "react";
import { ThemedText } from '@/components/texts/ThemedText';

interface User {
	firstName: string;
	lastName: string | null;
	username: string;
	email: string;
	password: string;
}

const Register = () => {
	const [formData, setFormData] = useState<User>({
		username: '',
		email: '',
		firstName: '',
		lastName: null,
		password: ''
	});

	const handleSubmit = () => {
		console.log(formData);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<ThemedText type={"header3"} style={styles.title}>Inscription</ThemedText>
				<ThemedInput
					placeholder="Pseudo"
					onChangeText={(value) => setFormData({ ...formData, username: value })}
				/>
				<ThemedInput
					placeholder="Email"
					onChangeText={(value) => setFormData({ ...formData, email: value })}
					keyboardType={"email-address"}
				/>
				<ThemedInput
					placeholder="Mot de passe"
					onChangeText={(value) => setFormData({ ...formData, password: value })}
					secureTextEntry={true}
				/>
				<CustomButton text="Submit" textProps={{color: 'background'}} backgroundColor={'primary'} onPress={handleSubmit}/>
			</View>
		</SafeAreaView>
	);
};

export default Register;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		width: "80%",
		display: "flex",
		gap: 20
	},
	title: {
		marginBottom: 20,
		textAlign: "center",
	},
});