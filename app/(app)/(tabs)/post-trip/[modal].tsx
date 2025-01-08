import { usePostTrip } from '@/providers';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
	View,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
	Text,
	Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// TODO
// - [ ] Add types
// - [ ] Add comments
// - [ ] Add documetation
// - [ ] Refactor compenents and hooks
// - [ ] Dispatch components end hooks to their own files

// DATA
function LRLocations(): LRLocation[] {
	const lrCdaDivision = require('@/assets/data/lr_cda_division.json');
	const lrDistricts = require('@/assets/data/lr_districts.json');

	const lrLocations = [] as LRLocation[];

	lrCdaDivision.forEach((division: any) => {
		lrLocations.push({
			name: division.fields.nom_commune,
			coordinates: division.fields.coordinates,
		});
	});

	lrDistricts.forEach((district: any) => {
		lrLocations.push({
			name: district.fields.cq_nom,
			coordinates: district.fields.coordinates,
		});
	});

	return lrLocations;
}

// TYPES
type LRLocation = {
	name: string;
	coordinates: [number, number];
};

// MAIN COMPONENT
export default function Modal() {
	const locations = LRLocations();

	// HOOKS
	const { modal } = useLocalSearchParams();
	const { setPoints } = usePostTrip();

	// STATES INITIALIZATIONS
	const setInitialPlaceholder = () => {
		let placeholder = '';
		if (modal === 'start') {
			placeholder = 'Choisir un point de départ';
		} else if (modal === 'end') {
			placeholder = "Choisir un point d'arrivée";
		}
		return placeholder;
	};

	// STATES
	const [placeholder, _] = useState<string>(setInitialPlaceholder);
	const [focus, setFocus] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [resetButton, setResetButton] = useState<boolean>(false);
	const [filteredLocations, setFilteredLocations] = useState<LRLocation[]>([]);

	// REFS
	const textInput = useRef<TextInput>(null);

	// EFFECTS
	useEffect(() => {
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				textInput.current?.blur();
				setFocus(false);
			}
		);

		return () => {
			keyboardDidHideListener.remove();
		};
	}, []);

	useEffect(() => {
		inputValue.length > 0 ? setResetButton(true) : setResetButton(false);
		inputValue.length === 0 ? setFilteredLocations([]) : null;
	}, [inputValue]);

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
				setFocus(false);
			}}
		>
			<SafeAreaView
				style={{
					padding: 18,
					flex: 1,
					backgroundColor: 'white',
				}}
			>
				<View style={{ width: '100%', flexDirection: 'column' }}>
					{/* [TODO] : use a <CustomInput> */}
					<View
						style={{
							height: 60,
							flexDirection: 'row',
							alignItems: 'center',
							borderColor: focus ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)',
							borderWidth: 1.25,
							borderRadius: 10,
							paddingHorizontal: 14,
							overflow: 'scroll',
						}}
					>
						<Ionicons
							onPress={() => {
								router.back();
							}}
							name='arrow-back'
							size={24}
							color='rgba(0, 0, 0, 0.8)'
						/>
						<TextInput
							style={{
								flex: 1,
								paddingLeft: 5,
								paddingRight: 10,
								fontSize: 16,
								color: 'rgba(0, 0, 0, 0.8)',
							}}
							ref={textInput}
							onFocus={() => {
								setFocus(true);
							}}
							onPressIn={() => {
								setFocus(true);
							}}
							cursorColor={'rgba(0, 0, 0, 0.8)'}
							placeholder={focus ? '' : placeholder}
							onChange={(e) => {
								setInputValue(e.nativeEvent.text);
								setFilteredLocations(
									locations.filter((location) =>
										location.name
											.toLowerCase()
											.startsWith(e.nativeEvent.text.toLowerCase())
									)
								);
							}}
							value={inputValue}
						/>
						{resetButton && (
							<Ionicons
								onPress={() => {
									setInputValue('');
								}}
								style={{
									backgroundColor: 'rgba(0, 0, 0, 0.2)',
									color: 'rgba(0, 0, 0, 0.7)',
									borderRadius: 100,
									padding: 2,
									boxShadow: '0 0 1px rgba(0, 0, 0, 0.1)',
								}}
								name={'close-outline'}
								size={18}
								color='rgba(0, 0, 0, 0.8)'
							/>
						)}
					</View>

					{/* CUSTOM TOOLTIP */}
					<View style={{ marginTop: 10 }}>
						{filteredLocations.slice(0, 5).map((location, index) => (
							<View
								style={{ width: '90%', padding: 10 }}
								key={index}
							>
								<Pressable
									style={{
										flexDirection: 'row',
										alignItems: 'center',
									}}
									onPress={() => {
										setInputValue('');
										setFilteredLocations([]);
										setPoints([
											{
												type: modal, // FIX: problème de typage
												locationName: location.name,
											},
										]);
										const section = modal === 'start' ? 2 : 3;
										router.push(
											`/(app)/(tabs)/post-trip/trip?section=${section}`
										);
									}}
								>
									<Ionicons
										name='location'
										size={34}
										color='rgba(0,0,0, 0.3)'
										style={{
											marginRight: 15,
											backgroundColor: 'rgba(0,0,0,0.2)',
											borderRadius: 10,
											padding: 5,
										}}
									/>
									<View style={{ flexDirection: 'column' }}>
										<Text
											style={{
												fontSize: 16,
												fontWeight: 'bold',
											}}
										>
											{location.name.slice(0, inputValue.length)}
											<Text style={{ color: 'rgba(0,0,0,0.5)' }}>
												{location.name.length > 60
													? location.name
															.slice(inputValue.length)
															.slice(0, 20) + '...'
													: location.name.slice(inputValue.length)}
											</Text>
										</Text>
										<Text // TODO: Add a dynamic value
											style={{
												fontSize: 12,
												fontWeight: 'thin',
												color: 'rgba(0,0,0,0.5)',
											}}
										>
											France
										</Text>
									</View>
								</Pressable>
							</View>
						))}
					</View>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}
