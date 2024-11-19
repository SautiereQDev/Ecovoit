import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "@/components/texts/ThemedText";
import DestinationForm from "@/components/forms/DestinationForm";
import { useState } from "react";
import {Colors} from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ListHistoricTrip from "@/components/pages/ListHistoricTrip";
import { useSession } from "@/components/context/SessionProvider";

export default function SearchTrip() {
  const { currentUser } = useSession();
  const [data, setData] = useState({ position: "", destination: "" });

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText type="header1" color="primary">
        Ecovoit
      </ThemedText>
      <DestinationForm
        formData={data}
        submitForm={setData}
        style={styles.searchInput}
      />
      <ThemedText type="header3" style={styles.secondaryTitle}>
        Mes trajets effectués ou en cours 🌿
      </ThemedText>
      <ListHistoricTrip
        data={[
          {
            depart: "Super U",
            destination: "Chez Auguste",
            status: "en cours",
            nom: "Thomas",
            date: "12 Decembre 2021",
          },
          {
            depart: "Super U",
            destination: "Chez Auguste",
            status: "effectue",
            nom: "Thomas",
            date: "12 Decembre 2021",
          },
          {
            depart: "Super U",
            destination: "Chez Auguste",
            status: "annule",
            nom: "Thomas",
            date: "12 Decembre 2021",
          },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    padding: 30,
  },
  searchInput: {
    marginTop: 15,
  },
  secondaryTitle: {
    marginTop: 30,
    marginBottom: 20,
  },
});
