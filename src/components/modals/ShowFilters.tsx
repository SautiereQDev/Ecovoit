import React from 'react';
import {
	FlatList,
	KeyboardAvoidingView,
	Modal,
	StyleSheet,
	View,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/buttons/CustomButton';
import { ThemedInput } from '@/components/inputs/ThemedInput';
import { ThemedText } from '@/components/texts/ThemedText';
import { EVAPI } from '@ecovoit-api/mock-adapter';

type Props = {
	visible: boolean;
	onClose?: () => void;
	filters: EVAPI.DB.Filters<EVAPI.TripEntry> | null;
	setFilters: React.Dispatch<
		React.SetStateAction<EVAPI.DB.Filters<EVAPI.TripEntry> | null>
	>;
};

export const ShowFilters = ({
	visible,
	onClose,
	filters,
	setFilters,
}: Props) => {
	const handleCheckboxPress = (name: keyof EVAPI.TripEntry) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: prevFilters?.[name] !== undefined ? undefined : '',
		}));
	};

	const deactivateEmptyFilters = () => {
		setFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters };
			Object.keys(updatedFilters).forEach((key) => {
				if (updatedFilters[key as keyof EVAPI.TripEntry] === '') {
					updatedFilters[key as keyof EVAPI.TripEntry] = undefined;
				}
			});
			return updatedFilters;
		});
		onClose && onClose();
	};

	return (
		<KeyboardAvoidingView>
			<Modal
				visible={visible}
				onRequestClose={deactivateEmptyFilters}
				transparent
			>
				<View style={styles.overlay}>
					<View style={styles.container}>
						<ThemedText
							type='header4'
							style={styles.title}
						>
							Filtres
						</ThemedText>
						<FlatList
							data={Object.keys(filters || {}).map((name) => ({
								name,
								value: filters?.[name as keyof EVAPI.TripEntry] || '',
								active: filters?.[name as keyof EVAPI.TripEntry] !== undefined,
							}))}
							renderItem={({ item }) => (
								<View style={styles.filter}>
									<Checkbox
										status={item.active ? 'checked' : 'unchecked'}
										color={Colors.light.primary}
										onPress={() =>
											handleCheckboxPress(item.name as keyof EVAPI.TripEntry)
										}
									/>
									<ThemedText
										style={styles.filterName}
										color={item.active ? 'text' : 'hidden'}
									>
										{item.name}
									</ThemedText>
									<ThemedInput
										size='small'
										placeholder='valeur'
										style={styles.input}
										disabled={!item.active}
										value={item.value?.toString() ?? ''}
										onChangeText={(val) =>
											setFilters((prevFilters) => ({
												...prevFilters,
												[item.name]: val || undefined,
											}))
										}
										keyboardType='numeric'
									/>
								</View>
							)}
							ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
							keyExtractor={(item) => item.name.toString()}
							style={styles.filters}
						/>
						<View style={styles.bottomButtons}>
							<CustomButton
								onPress={() =>
									setFilters({
										vehicle: undefined,
										id: undefined,
										driver: undefined,
										distance: undefined,
										duration: undefined,
										cancelled: undefined,
										seats: undefined,
										datetime: undefined,
										description: undefined,
									})
								}
								text='Reset'
								textProps={{ color: 'background' }}
								buttonStyle={styles.buttons}
								backgroundColor='resetButton'
							/>
							<CustomButton
								onPress={deactivateEmptyFilters}
								text='Fermer'
								textProps={{ color: 'background' }}
								buttonStyle={styles.buttons}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</KeyboardAvoidingView>
	);
};

export default ShowFilters;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	container: {
		paddingHorizontal: '5%',
		width: '90%',
		maxHeight: '55%',
		paddingTop: '3%',
		backgroundColor: Colors.light.background,
		borderRadius: 10,
		paddingBottom: '20%', // Ajout d'un padding en bas pour les boutons
	},
	title: {
		textAlign: 'center',
	},
	bottomButtons: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		position: 'absolute',
		bottom: 15,
		left: 10, // Correction de la position des boutons
		right: 10, // Correction de la position des boutons
	},
	buttons: {
		maxWidth: '40%',
	},
	filters: {
		marginTop: '7%',
	},
	filter: {
		width: '90%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	filterName: {
		margin: 'auto',
	},
	input: {
		width: '40%',
		marginLeft: 'auto',
	},
});
