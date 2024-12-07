import { useLocation } from "@/context/LocationProvider";
import MyMap from "@/components/map/MyMap";
import { Pressable, StyleSheet, View, Text } from "react-native";

export default function PostTripDatetime() {
  const { location, errorMsg } = useLocation();

  return (
    <View style={[{ display: "flex", flex: 1, position: "relative" }]}>
      <Text>Le jour du voyage</Text>
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
