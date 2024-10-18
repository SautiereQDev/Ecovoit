import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import DestinationForm from "@/components/DestinationForm";
import {useState} from "react";
import {Colors} from "@/constants/Colors.ts";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Index() {
    const [data, setData] = useState({position: "", destination: ""});

    return (
        <SafeAreaView style={styles.container}>
            <ThemedText
                type='header1'
                color='primary'
            >
                Ecovoit
            </ThemedText>
            <DestinationForm
                formData={data}
                submitForm={setData}
				style={styles.searchInput}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
		paddingTop: 40,
        flex: 1,
        backgroundColor: Colors.light.background,
        alignItems: "center",
    },
	searchInput: {
		marginTop : 20
	}
});
