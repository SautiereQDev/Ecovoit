import React from 'react';
import {  Text, View, TextInput } from "react-native";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Entrez votre email</Text>
      <TextInput
        onChangeText={setUsername}
        value={username}
        placeholder='Email'
      />
      
      <Text>Entrez votre mot de passe</Text>
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder='Mot de passe'
        secureTextEntry
      />
      

    </View>
  );
}