import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	IconButton,
	SearchTripCard,
	ThemedInput,
	ThemedText,
} from "@/components";
import { useState } from "react";

export const SearchPage = () => {
	// const { currentUser } = useSession();
	const [searchData, setSearchData] = useState({
		position: "Super U",
		destination: "Chez Auguste",
	});
	const [isSearch, setIsSearch] = useState(false);

	const handleSubmit = () => {
		setIsSearch(true);
	};

	const resetSearch = () => {
		setSearchData({
			position: "",
			destination: "",
		});
		setIsSearch(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			{isSearch ? (
				<>
					<View style={styles.header}>
						<View style={styles.destination}>
							<ThemedText color='text'>
								{searchData.position}
								{" -> "}
								{searchData.destination}
							</ThemedText>
						</View>
						<IconButton
							name='x'
							color={Colors.light.resetButton}
							onPress={resetSearch}
							size={30}
							buttonStyle={styles.resetButton}
						/>
					</View>
					<ThemedText
						type='header4'
						style={styles.secondaryTitle}
					>
						Trajets correspondants 🔗
					</ThemedText>
					<SearchTripCard
						data={{
							depart: "Super U",
							destination: "Chez Auguste",
							nom: "Thomas",
							date: "12 Décembre 2021 - 15h20",
							distance: 500,
						}}
					/>
				</>
			) : (
				<>
					<View>
						<ThemedText
							type='header4'
							style={styles.secondaryTitle}
						>
							Rechercher votre trajet 🔎
						</ThemedText>
						<View style={styles.formContainer}>
							<ThemedInput
								placeholder={"Départ"}
								value={searchData.position}
								onChangeText={(val) =>
									setSearchData({ ...searchData, position: val })
								}
							/>
							<ThemedInput
								placeholder={"Destination"}
								value={searchData.destination}
								onChangeText={(val) =>
									setSearchData({ ...searchData, destination: val })
								}
							/>
							{/*	TODO: Ajouter un input Date pour selectionner la date et l'heure du covoiturage*/}
							<IconButton
								name='search'
								title={"Rechercher"}
								size={24}
								color={Colors.light.primary}
								buttonStyle={styles.submitButton}
								textProps={{ type: "accent", color: "primary" }}
								onPress={handleSubmit}
							/>
						</View>
					</View>
				</>
			)}
		</SafeAreaView>
	);
};

export default SearchPage;

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		flex: 1,
		backgroundColor: Colors.light.background,
		paddingHorizontal: 35,
	},
	header: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 15,
	},
	formContainer: {
		gap: 20,
	},
	secondaryTitle: {
		marginTop: 25,
		marginBottom: 25,
	},
	destination: {
		borderWidth: 1.5,
		borderColor: Colors.light.inputText,
		padding: 10,
		borderRadius: 10,
	},
	resetButton: {
		borderWidth: 2,
		borderColor: Colors.light.resetButton,
		borderRadius: 99999,
		alignItems: "center",
		display: "flex",
		justifyContent: "center",
		height: 40,
		width: 40,
	},
	submitButton: {
		display: "flex",
		flexDirection: "row",
		gap: 10,
		paddingVertical: 8,
		borderWidth: 2,
		borderColor: Colors.light.primary,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});
