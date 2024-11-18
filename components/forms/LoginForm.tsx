import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/_Colors";
import { Ionicons } from "@expo/vector-icons";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        {/* TODO: ThemedTextInput */}
        <TextInput
          cursorColor={"#000"}
          style={[styles.input, isFocused && styles.focusedInput]}
          onChangeText={setUsername}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={username}
          placeholder="Email"
          inputMode="email"
          autoCapitalize="none"
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TextInput
          cursorColor={"#000"}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Mot de passe"
          secureTextEntry={!showPassword}
          inputMode="text"
          autoCapitalize="none"
        />
        <Text style={styles.inputLegend}>Mot de passe oublié ?</Text>
        <Ionicons
          size={20}
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
          name={showPassword ? "eye-off" : "eye-outline"}
        ></Ionicons>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            alert(`Email : ${username}\n Mot de passe : ${password}`)
          }
        >
          <Text style={styles.button}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.light.inputBackground,
    height: 50,
    width: 300,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    position: "relative",
  },
  focusedInput: {
    borderColor: "#2196F3",
    borderWidth: 1,
  },
  inputLegend: {
    position: "absolute",
    bottom: 0,
    right: 5,
    fontSize: 11,
    color: "#aaa",
  },
  icon: {
    position: "absolute",
    right: 20,
    top: 15,
    color: Colors.light.inputText,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  button: {
    color: "#fff",
    backgroundColor: "#2196F3",
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    width: 175,
    fontWeight: "700",
    borderRadius: 7.5,
  },
});

export default LoginForm;
