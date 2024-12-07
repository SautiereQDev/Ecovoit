import { useLocation } from "@/context/LocationProvider";
import MyMap from "@/components/map/MyMap";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View, Text } from "react-native";

export default function PostTripEnd() {
  const { location, errorMsg } = useLocation();

  return (
    <View style={[{ display: "flex", flex: 1, position: "relative" }]}>
      <MyMap location={location} />

      <Pressable
        onPress={() => {}}
        style={[{ position: "absolute", bottom: 10, right: 0 }, styles.button]}
      >
        <Link href="/(app)/(tabs)/postTrip/datetime">Suivant</Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: "#000",
    borderWidth: 2,
    padding: 3,
    borderRadius: 5,
    backgroundColor: "#0005",
    margin: 15,
  },
});
