import React from "react";
import {Text, View, StyleSheet, ScrollView} from "react-native";
import {Link} from "expo-router";
import {LoginForm} from "@/components";

/**
 * Identifiants de connexion d'un utilisateur
 */
type Credentials = {
  username: string;
  password: string;
};

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  /**
   * Soumission du formulaire de connexion
   */
  const handleSubmit = () => {
	const credentials: Credentials = {
	  username,
	  password,
	};
	console.log(JSON.stringify(credentials));
  };

  return (
	  <ScrollView>
		<View style={{flex: 1}}>
		  <View style={styles.header}>
			<Text style={styles.h1}>Ecovoit</Text>
			<Text style={styles.h2}>Connectez-vous</Text>
		  </View>

		  <LoginForm></LoginForm>

		  <View style={styles.footer}>
			<Text style={styles.h3}>Pas encore membre ?</Text>
			<Link href='/login'>Inscription</Link>
		  </View>
		</View>
	  </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
	justifyContent: "center",
	alignItems: "center",
	marginVertical: 50,
  },
  h1: {
	fontSize: 40,
  },
  h2: {
	fontSize: 30,
  },
  h3: {
	fontSize: 20,
  },
  footer: {
	alignItems: "center",
  },
});
