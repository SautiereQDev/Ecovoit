import { useLocation } from "@/components/context/LocationProvider";
import { useTripCreation } from "@/components/context/TripCreationProvider";
import MyMap from "@/components/map/MyMap";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View, Text, Modal } from "react-native";

export default function PostTripStart() {
  const { location, errorMsg } = useLocation();
  const { trip } = useTripCreation();

  const modalOpen = false;

  if (modalOpen) {
    return (
      <Modal>
        <Text>Hello Modal</Text>
      </Modal>
    );
  }

  return (
    <View style={[{ display: "flex", flex: 1, position: "relative" }]}>
      <MyMap location={location} />

      <Pressable
        onPress={() => {}}
        style={[{ position: "absolute", bottom: 10, right: 0 }, styles.button]}
      >
        <Link href="/(app)/(tabs)/postTrip/end">Suivant</Link>
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
