import { Text, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/components/context/SessionProvider";
import { Link } from "expo-router";

export default function HomePage() {
  const { currentUser } = useSession();
  return (
    <View>
      <Text style={[{ margin: 50 }]}>
        Accueil - Bienvenue dans Ecovoit {currentUser?.firstName}
      </Text>
      <Link style={[{ margin: 50 }]} href="/(app)/(tabs)/postTrip/start">
        Publier un covoiturage
      </Link>
      <Link style={[{ margin: 50 }]} href="/(app)/(tabs)/searchTrip/search">
        Rechercher un covoiturage
      </Link>
    </View>
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
