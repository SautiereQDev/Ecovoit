import {StyleSheet, View} from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function Index() {

  return (
      <View style={styles.container}>
        <ThemedText type="header1" color="primary">Ecovoit</ThemedText>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})