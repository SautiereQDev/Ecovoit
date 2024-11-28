import { StyleSheet, View, FlatList } from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	IconButton,
	SearchTripCard,
	ThemedInput,
	ThemedText,
} from "@/components";
import React, { useState } from "react";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export const SearchPage = () => {
	const [searchData, setSearchData] = useState({
		depart: "Super U",
		destination: "Chez Auguste",
		date: new Date(),
	});
	const [isSearch, setIsSearch] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		const currentDate = selectedDate || searchData.date;
		setShowDatePicker(false);
		setSearchData({ ...searchData, date: currentDate });
	};

	const handleSubmit = () => {
		setIsSearch(true);
		console.log(searchData);
	};

	const resetSearch = () => {
		setSearchData({
			depart: "",
			destination: "",
			date: new Date(),
		});
		setIsSearch(false);
	};

	const formatDate = (date: Date) => {
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	};

	const formatDateReverse = (date: Date) => {
		return `${date.toLocaleDateString("fr-FR", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})} - ${date.getHours()}h${date.getMinutes()}`;
	};

	const data = [
		{
			depart: searchData.depart,
			destination: searchData.destination,
			nom: "Thomas",
			date: formatDateReverse(searchData.date),
			distance: 500,
		},
		{
			depart: searchData.depart,
			destination: searchData.destination,
			nom: "Thomas",
			date: formatDateReverse(searchData.date),
			distance: 500,
		},
		{
			depart: searchData.depart,
			destination: searchData.destination,
			nom: "Thomas",
			date: formatDateReverse(searchData.date),
			distance: 500,
		},
	];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				{isSearch ? (
					<>
						<View style={styles.header}>
							<View style={styles.destination}>
								<ThemedText color='text'>
									{searchData.depart}
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
						<FlatList
							data={data}
							renderItem={({ item }) => (
								<SearchTripCard
									data={{
										depart: item.depart,
										destination: item.destination,
										nom: item.nom,
										date: item.date,
										distance: item.distance,
									}}
								></SearchTripCard>
							)}
							keyExtractor={(item, index) => index.toString()}
							ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
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
									value={searchData.depart}
									onChangeText={(val) =>
										setSearchData({ ...searchData, depart: val })
									}
								/>
								<ThemedInput
									placeholder={"Destination"}
									value={searchData.destination}
									onChangeText={(val) =>
										setSearchData({ ...searchData, destination: val })
									}
								/>
								<IconButton
									name='calendar'
									title={`${formatDate(searchData.date)}`}
									onPress={() => setShowDatePicker(true)}
									style={styles.dateButton}
									size={20}
									iconFirst={true}
								/>
								{showDatePicker && (
									<DateTimePicker
										value={searchData.date}
										mode='date'
										display='default'
										onChange={onDateChange}
									/>
								)}
								{/*	TODO : Faire un modal d'erreur */}
								{/*	TODO: Afficher une erreur si les inputs sont vide lors du submit*/}
								<IconButton
									name='search'
									title={"Rechercher"}
									size={24}
									color={Colors.light.primary}
									buttonStyle={styles.submitButton}
									textProps={{ type: "header5", color: "background" }}
									onPress={handleSubmit}
									iconStyle={{ color: Colors.light.background }}
								/>
							</View>
						</View>
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

export default SearchPage;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.light.background,
	},
	content: {
		marginTop: 10,
		flex: 0,
		width: "90%",
		marginHorizontal: "auto",
	},
	header: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
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
		paddingVertical: 10,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.light.primary,
	},
	dateButton: {
		display: "flex",
		flexDirection: "row",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		borderWidth: 1.5,
		gap: 10,
		width: "100%",
		backgroundColor: Colors.light.background,
		borderColor: Colors.light.inputText,
	},
});
