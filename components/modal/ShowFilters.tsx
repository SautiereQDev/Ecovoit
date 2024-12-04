import React from 'react';
import { Modal, StyleSheet, View, Pressable } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Filter, FiltreType } from '@/types';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/buttons/CustomButton';
import { ThemedInput } from '@/components/inputs/ThemedInput';
import { ThemedText } from '@/components/texts/ThemedText';

type Props = {
	visible: boolean;
	onClose?: () => void;
	filters: Filter[];
	setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
};

export const ShowFilters = ({
	                            visible,
	                            onClose,
	                            filters,
	                            setFilters,
                            }: Props) => {
	const isChecked = (name: FiltreType) => {
		const filter = filters.find((filter) => filter.name === name);
		return filter?.active;
	};

	const toggleCheck = (name: FiltreType) => {
		const newFilters = filters.map((filter) => {
			if (filter.name === name) {
				return {
					...filter,
					active: !filter.active,
				};
			}
			return filter;
		});
		setFilters(newFilters);
	};

	const initialFilters: Filter[] = Object.keys(FiltreType)
		.filter((key) => !isNaN(Number(key))) // Filter out numeric keys
		.map((key) => ({
			name: FiltreType[key as keyof typeof FiltreType],
			value: 0,
			active: false,
		}));

	const resetFilters = () => {
		setFilters(initialFilters);
	};

	const updateValue = (name: FiltreType, value: string) => {
		const numericValue = Number(value);
		if (!isNaN(numericValue)) {
			const newFilters = filters.map((filter) => {
				if (filter.name === name) {
					return {
						...filter,
						value: numericValue,
					};
				}
				return filter;
			});
			setFilters(newFilters);
		}
	};

	return (
		<Modal
			visible={visible}
			onRequestClose={onClose}
			transparent={true}
		>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<ThemedText
						type={'header4'}
						style={styles.title}
					>
						Filtres
					</ThemedText>
					<FlatList
						data={filters}
						renderItem={({ item }) => (
							<Pressable
								style={styles.filter}
								onPress={() => toggleCheck(item.name)}
							>
								<Checkbox
									status={isChecked(item.name) ? 'checked' : 'unchecked'}
									onPress={() => toggleCheck(item.name)}
									color={Colors.light.primary}
								/>
								<ThemedText
									style={styles.filterName}
									color={item.active ? 'text' : 'hidden'}
								>
									{item.name.toString() !==
									FiltreType[FiltreType.ecart_horraire]
										? item.name.toString().charAt(0).toUpperCase() +
										item.name.toString().slice(1)
										: item.name.toString() === FiltreType[FiltreType.distance]
											? 'Distance départ'
											: 'Ecart horraire'}
								</ThemedText>

								<ThemedInput
									size={'small'}
									placeholder={'valeur'}
									style={styles.input}
									disabled={!item.active}
									value={item.value.toString()}
									onChangeText={(val) => updateValue(item.name, val)}
									keyboardType={'numeric'}
								/>
							</Pressable>
						)}
						ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
						keyExtractor={(item) => item.name.toString()}
						style={styles.filters}
					/>
					<View style={styles.bottomButtons}>
						<CustomButton
							onPress={resetFilters}
							text={'Supprimer les filtres'}
							textProps={{ type: 'bigger', color: 'background' }}
							buttonStyle={styles.buttons}
							backgroundColor={'resetButton'}
						/>
						<CustomButton
							onPress={onClose}
							text={'Fermer'}
							textProps={{ type: 'bigger', color: 'background' }}
							buttonStyle={styles.buttons}
							backgroundColor={'primary'}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ShowFilters;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
	},
	container: {
		width: '90%',
		height: '50%',
		paddingTop: '3%',
		backgroundColor: Colors.light.background,
		borderRadius: 10,
	},
	title: {
		textAlign: 'center',
	},
	bottomButtons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		gap: 20,
		position: 'absolute',
		bottom: 15,
		right: 10,
	},
	buttons: {
		paddingVertical: '2%',
		paddingHorizontal: '5%',
	},
	filters: {
		marginTop: '7%',
	},
	filter: {
		width: '90%',
		display: 'flex',
		flexDirection: 'row',
		margin: 'auto',
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