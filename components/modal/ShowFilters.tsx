import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/texts/ThemedText';
import CustomButton from '@/components/buttons/CustomButton';
import { Filter, FiltreType } from '@/types';
import { FlatList } from 'react-native-gesture-handler';
import BouncyCheckbox from 'react-native-bouncy-checkbox/lib';
import ThemedInput from '@/components/inputs/ThemedInput';
import Colors from '@/constants/Colors';

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
		// @ts-ignore
		setFilters(newFilters);
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
							<View style={styles.filter}>
								<BouncyCheckbox
									isChecked={isChecked(item.name)}
									onPress={() => toggleCheck(item.name)}
									disableText={false}
									useBuiltInState={false}
								/>
								<ThemedText style={styles.filterName}>
									{item.name.toString() !==
									FiltreType[FiltreType.ecart_horraire]
										? item.name.toString().charAt(0).toUpperCase() +
										item.name.toString().slice(1)
										: item.name.toString() === FiltreType[FiltreType.distance]
											? 'Distance départ'
											: 'Ecart horraire'}
								</ThemedText>
								<ThemedInput
									placeholder={'valeur'}
									style={styles.input}
								/>
							</View>
						)}
						ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
						keyExtractor={(item) => item.name.toString()}
						style={styles.filters}
					/>
					<CustomButton
						onPress={onClose}
						text={'Fermer'}
						textProps={{ type: 'bigger', color: 'background' }}
						buttonStyle={styles.closingButton}
					/>
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
	closingButton: {
		paddingHorizontal: '5%',
		position: 'absolute',
		bottom: 15,
		right: 15,
	},
	filters: {
		marginTop: '5%',
	},
	filter: {
		width: '90%',
		display: 'flex',
		flexDirection: 'row',
		margin: 'auto',
		verticalAlign: 'middle',
	},
	input: {
		flex: 1,
		maxWidth: '40%',
		marginLeft: 'auto',
	},
	filterName: {
		margin: 'auto',
	},
});