import React, { useEffect } from 'react';
import {
	FlatList,
	KeyboardAvoidingView,
	Modal,
	Pressable,
	StyleSheet,
	View,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/buttons/CustomButton';
import { ThemedInput } from '@/components/inputs/ThemedInput';
import { ThemedText } from '@/components/texts/ThemedText';
import { notify } from 'react-native-notificated';
import { useTripSearch } from '@/providers/SearchProvider';

type Props = {
	visible: boolean;
	onClose?: () => void;
};

export const ShowFilters = ({ visible, onClose }: Props) => {
	const {
		filters,
		toggleFilter,
		updateFilterValue,
		filtersChanged,
		resetFilters,
	} = useTripSearch();

	useEffect(() => {
		if (!visible && filtersChanged()) {
			notify('success', {
				params: { title: 'Les filtres ont bien été mis à jour' },
			});
		}
	}, [visible, filters, filtersChanged]);

	return (
		<KeyboardAvoidingView>
			<Modal
				visible={visible}
				onRequestClose={onClose}
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
							data={filters}
							renderItem={({ item }) => (
								<Pressable
									style={styles.filter}
									onPress={() => toggleFilter(item.name)}
								>
									<Checkbox
										status={item.active ? 'checked' : 'unchecked'}
										color={Colors.light.primary}
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
										value={item.value.toString()}
										onChangeText={(val) => updateFilterValue(item.name, val)}
										keyboardType='numeric'
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
								text='Supprimer les filtres'
								textProps={{ type: 'bigger', color: 'background' }}
								buttonStyle={styles.buttons}
								backgroundColor='resetButton'
							/>
							<CustomButton
								onPress={onClose}
								text='Fermer'
								textProps={{ type: 'bigger', color: 'background' }}
								buttonStyle={styles.buttons}
								backgroundColor='primary'
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
		height: '50%',
		paddingTop: '3%',
		backgroundColor: Colors.light.background,
		borderRadius: 10,
	},
	title: {
		textAlign: 'center',
	},
	bottomButtons: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		position: 'absolute',
		gap: 15,
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
