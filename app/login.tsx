import React from 'react';
import {  Text, View, TextInput, Button, Alert } from "react-native";
import { Link } from 'expo-router';

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
      <Text>Ecovoit</Text>
      <Text>Connectez-vous</Text>

      <View>
        <TextInput
          onChangeText={setUsername}
          value={username}
          placeholder='Email'
          inputMode='email'
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder='Mot de passe'
          secureTextEntry
          inputMode='text'
        />
      </View>
      

      <Button title='Se connecter'
              onPress={handleSubmit}
      ></Button>

      <Text >Pas encore membre ?</Text>

      <Link href='/login' >Inscription</Link>

    </View>
  );
}