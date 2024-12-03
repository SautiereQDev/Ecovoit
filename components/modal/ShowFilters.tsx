import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/texts/ThemedText';
import CustomButton from '@/components/buttons/CustomButton';
import { Filter } from '@/types';
import { FlatList } from 'react-native-gesture-handler';
import Checkbox from 'react-native-bouncy-checkbox';
import ThemedInput from '@/components/inputs/ThemedInput';

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
	const toggleCondition = (name: string) => {
		setFilters((prevFilters) =>
			prevFilters.map((filter) =>
				filter.name === name
					? {
						...filter,
						condition: filter.condition === 'lower' ? 'uper' : 'lower',
					}
					: filter
			)
		);
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
					<CustomButton
						onPress={onClose}
						text={'Fermer'}
						textProps={{ type: 'bigger', color: 'background' }}
						buttonStyle={styles.closingButton}
					/>
					<FlatList
						data={filters}
						renderItem={({ item }) => (
							<View style={styles.filter}>
								<Checkbox
									onPress={() => {
										setFilters((prevFilters) => {
											return prevFilters.map((filter) => {
												if (filter.name === item.name) {
													return {
														...filter,
														active: !filter.active,
													};
												}
												return filter;
											});
										});
									}}
								/>
								<ThemedText>{item.name}</ThemedText>
								<CustomButton
									text={item.condition === 'lower' ? '<' : '>'}
									onPress={() => toggleCondition(item.name)}
									textProps={{ type: 'bigger', color: 'background' }}
									buttonStyle={styles.conditionButton}
								/>
								<ThemedInput
									placeholder={"Valeur"}
									onChangeText={(value) => setFilters((prevFilters) => {
										return prevFilters.map((filter) => {
											if (filter.name === item.name) {
												return {
													...filter,
													value: parseFloat(value),
												};
											}
											return filter;
										});
									})}
									style={styles.input}
								/>
							</View>
						)}
						keyExtractor={(item) => item.name}
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
		width: '80%',
		height: '50%',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		marginHorizontal: '10%',
		marginVertical: '10%',
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
	},
	closingButton: {
		paddingHorizontal: '5%',
		paddingVertical: '2%',
		position: 'absolute',
		bottom: 15,
		right: 15,
	},
	filter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	conditionButton: {
		paddingVertical: '2%',
		marginLeft: 10,
	},
	input: {
		flex: 1,
		marginLeft: 10,
	},
});