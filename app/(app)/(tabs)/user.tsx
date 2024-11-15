import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSession } from "@/components/context/SessionProvider";

export default function UserPage() {
  const { signOut, isLoading } = useSession();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"small"} animating />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>One</Text>
      <Pressable onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
