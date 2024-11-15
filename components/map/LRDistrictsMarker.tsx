import { View, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import LocRecord from "@/types/LocRecords";

interface LRDistrictsMarkersProps {}

export default function LRDistrictsMarkers({}: LRDistrictsMarkersProps) {
  const records: LocRecord.LRDistricts[] = require("@/assets/data/lr_districts.json");

  return (
    <View style={styles.container}>
      {records.map((record, index) => {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: record.fields.coordinates[1],
              longitude: record.fields.coordinates[0],
            }}
            title={record.fields.cq_nom}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  calloutContainer: {
    position: "relative",
  },
  marker: {},
  shadow: {
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  indicator: {
    zIndex: 3,
  },
});
