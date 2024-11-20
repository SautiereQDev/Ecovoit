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

	const handleSubmit = (event) => {
		setIsSearch(true);
	};

	const resetSearch = (event) => {
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
						<View style={styles.searchInput}>
							<ThemedText color='text'>
								{searchData.position}
								{" -> "}
								{searchData.destination}
							</ThemedText>
						</View>
						<IconButton
							name='x-circle'
							size={24}
							color={Colors.light.primary}
							onPress={resetSearch}
							style={styles.resetButton}
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
								style={styles.searchInput}
							/>
							<ThemedInput
								placeholder={"Destination"}
								value={searchData.destination}
								onChangeText={(val) =>
									setSearchData({ ...searchData, destination: val })
								}
								style={styles.searchInput}
							/>
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
	},
	formContainer: {
		gap: 20,
	},
	secondaryTitle: {
		marginTop: 25,
		marginBottom: 25,
	},
	resetButton: {},
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
