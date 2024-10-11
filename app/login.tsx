import React from 'react';
import {  Text, View, TextInput, Button, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * Identifiants de connexion d'un utilisateur
 */
type Credentials = {
  username: string,
  password: string
}

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  /**
   * Soumission du formulaire de connexion
   */
  const handleSubmit = () => {
    const credentials: Credentials ={
      username,
      password
    }
    console.log(JSON.stringify(credentials));

  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    
    <View style={styles.header}>
      <Text style={styles.h1}>Ecovoit</Text>
      <Text style={styles.h2}>Connectez-vous</Text>
    </View>
      

      <View>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder='Email'
          inputMode='email'
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder='Mot de passe'
          secureTextEntry
          inputMode='text'
        />
      </View>
      

      <TouchableOpacity

        style={styles.button}
        onPress={handleSubmit}
        
      >
        <Text style={styles.buttonText}>Se connecter</Text>

      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.h3}>Pas encore membre ?</Text>
        <Link href='/login'>Inscription</Link>
      </View>
      

    </View>
  );
}

const styles = StyleSheet.create(
  {
    header: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40
    },
    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 30,
    },
    h3: {
      fontSize: 20
    },
    input: {
      backgroundColor: '#aaa',
      height: 40,
      width: 300,
      marginBottom: 20,
      borderRadius: 8,
      padding: 7.5,
    },
    button: {
      backgroundColor: "#2196F3",
      padding: 10,
      borderRadius: 7.5,
      marginBottom: 30
    },
    buttonText: {
      fontSize: 20,
      color: "#fff",
    },
    footer: {
      width: 300
    }
  }
)