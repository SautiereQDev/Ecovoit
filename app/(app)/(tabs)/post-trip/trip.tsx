import { usePostTrip } from '@/providers';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { set } from 'zod';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';
import { SeatPicker } from '@/components/UI';
import { PressableIcon } from '.';

// TYPES
type TripSectionProps = {
	expandedTitle: string;
	reducedTitle: string;
	children: any;
	expanded: boolean;
	onPress: () => void;
	value: string | undefined;
	placeholder: string;
	flex: number;
};

type CustomCalendarProps = {
	onDayPress: (day: string) => void;
	selectedDate?: string;
};

type TimePickerProps = {
	onPick: (event: DateTimePickerEvent, selectedTime: Date | undefined) => void;
	picked: Date | undefined;
};

// COMPONENTS
function TripSection({
	expandedTitle,
	reducedTitle,
	children,
	expanded,
	onPress,
	value,
	placeholder,
	flex,
}: TripSectionProps) {
	return (
		<Pressable
			onPress={onPress}
			style={{
				height: expanded ? null : 70,
				flex: expanded ? flex : 0,
				borderRadius: 20,
				boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
				marginVertical: 5,
				backgroundColor: 'rgb(255, 255, 255)',
			}}
		>
			<View
				style={{
					flexDirection: 'column',
					alignItems: expanded ? 'flex-start' : 'center',
					justifyContent: expanded ? 'space-between' : 'center',
					width: '100%',
					height: '100%',
				}}
			>
				<View style={{ width: '100%', padding: 15 }}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: expanded ? undefined : 'space-between',
							gap: expanded ? 5 : undefined,
							marginBottom: expanded ? 10 : undefined,
							width: expanded ? undefined : '100%',
						}}
					>
						<Text
							style={{
								fontSize: expanded ? 28 : 14,
								fontWeight: 'bold',
								color: expanded ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)',
							}}
						>
							{expanded ? expandedTitle : reducedTitle}
						</Text>
						{!expanded && (
							<Text
								style={{
									fontSize: 14,
									fontWeight: 'bold',
									color: 'rgba(0, 0, 0, 0.8)',
								}}
							>
								{value ? value : placeholder}
							</Text>
						)}
					</View>

					{expanded && children}
				</View>
			</View>
		</Pressable>
	);
}

function CustomCalendar({ onDayPress, selectedDate }: CustomCalendarProps) {
	LocaleConfig.locales['fr'] = {
		monthNames: [
			'Janvier',
			'Février',
			'Mars',
			'Avril',
			'Mai',
			'Juin',
			'Juillet',
			'Août',
			'Septembre',
			'Octobre',
			'Novembre',
			'Décembre',
		],
		monthNamesShort: [
			'Janv.',
			'Févr.',
			'Mars',
			'Avril',
			'Mai',
			'Juin',
			'Juil.',
			'Août',
			'Sept.',
			'Oct.',
			'Nov.',
			'Déc.',
		],
		dayNames: [
			'Dimanche',
			'Lundi',
			'Mardi',
			'Mercredi',
			'Jeudi',
			'Vendredi',
			'Samedi',
		],
		dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
		today: "Aujourd'hui",
	};

	LocaleConfig.defaultLocale = 'fr';

	return (
		<View
			style={{
				width: '100%',
				height: '80%',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					width: 275,
					justifyContent: 'space-between',
					paddingHorizontal: 28,
					paddingBottom: 10,
				}}
			>
				{['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
					<Text
						key={index}
						style={{
							fontSize: 15,
							color: 'rgba(0, 0, 0, 0.6)',
							fontWeight: 'bold',
						}}
					>
						{day}
					</Text>
				))}
			</View>
			<CalendarList
				theme={{
					dayTextColor: 'rgba(0, 0, 0, 0.8)',
					todayTextColor: 'rgba(0, 0, 0, 0.8)',
				}}
				hideDayNames={true}
				calendarWidth={275}
				style={{ maxHeight: 350, width: '100%' }}
				firstDay={1}
				onDayPress={(day) => {
					// setSelectedDate(day.dateString);
					onDayPress(day.dateString);
				}}
				minDate={new Date().toUTCString()}
				pastScrollRange={0}
				markedDates={
					selectedDate
						? {
								[selectedDate]: {
									selected: true,
									selectedColor: 'rgba(0, 0, 0, 0.8)',
								},
							}
						: {}
				}
			/>
		</View>
	);
}

function TimePicker({ onPick, picked }: TimePickerProps) {
	// UTILS
	const displayTime = (time: Date | string) => {
		if (typeof time === 'string') {
			return time;
		}
		return time.toLocaleTimeString('fr-FR', {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	// STATES INITIALIZATION
	const setInitialTime = () => {
		if (picked) {
			return picked;
		}
		return '--:--';
	};

	// STATES
	const [time, setTime] = useState<Date | string>(setInitialTime);
	const [pickerActive, setPickerActive] = useState<boolean>(false);
	return (
		<Pressable
			onPress={() => setPickerActive(true)}
			style={{
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Text
				style={{
					fontSize: 50,
					fontWeight: 'bold',
					color: 'rgba(0, 0, 0, 0.8)',
				}}
			>
				{displayTime(time)}
			</Text>
			{pickerActive && (
				<DateTimePicker
					testID='dateTimePicker'
					value={typeof time === 'string' ? new Date() : time}
					mode='time'
					is24Hour={true}
					onChange={(event, selectedTime) => {
						setTime(selectedTime!);
						setPickerActive(false);
						onPick(event, selectedTime);
					}}
				/>
			)}
		</Pressable>
	);
}

// MAIN COMPONENT
export default function Trip() {
	const { section } = useLocalSearchParams();

	// STATES INITIALIZATION
	const setInitialExpandedSection = () => {
		if (section) {
			return parseInt(section as string);
		}
		return 1;
	};

	// STATES
	const [expandedSection, setExpandedSection] = useState<number>(
		setInitialExpandedSection
	); // [TODO] Convertir en contexte

	// HOOKS
	const {
		trip,
		getStartPoint,
		getEndPoint,
		resetTrip,
		setDate,
		setTime,
		setSeats,
		date,
		time,
		tripIsValid,
		postTrip,
		setDescription,
		setVehicle,
		setDatetime,
	} = usePostTrip();

	return (
		<SafeAreaView
			style={{
				padding: 18,
				flex: 1,
				backgroundColor: 'rgba(215, 215, 215, 0.1)',
			}}
		>
			<TripSection
				flex={2 / 5}
				expandedTitle='Départ'
				reducedTitle="D'où partez-vous ?"
				placeholder='Choisir'
				expanded={expandedSection === 1}
				onPress={() => setExpandedSection(1)}
				value={getStartPoint()?.locationName}
			>
				<Pressable
					onPress={() => router.push('/(app)/(tabs)/post-trip/start')}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						borderColor: 'rgba(0, 0, 0, 0.1)',
						borderWidth: 1.25,
						borderRadius: 10,
						padding: 6,
					}}
				>
					<Ionicons
						style={{ margin: 5 }}
						name={getStartPoint() ? 'location-outline' : 'search'}
						size={18}
						color='rgba(0, 0, 0, 0.8)'
					/>

					<Text style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
						{getStartPoint()
							? getStartPoint().locationName
							: 'Choisir un point de départ'}
					</Text>
				</Pressable>
			</TripSection>

			<TripSection
				flex={2 / 5}
				expandedTitle='Destination'
				reducedTitle='Où allez-vous ?'
				placeholder='Choisir'
				expanded={expandedSection === 2}
				onPress={() => setExpandedSection(2)}
				value={trip.points.filter((p) => p.type === 'end')[0]?.locationName}
			>
				<Pressable
					onPress={() => router.push('/(app)/(tabs)/post-trip/end')}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						borderColor: 'rgba(0, 0, 0, 0.1)',
						borderWidth: 1.25,
						borderRadius: 10,
						padding: 6,
					}}
				>
					<Ionicons
						style={{ margin: 5 }}
						name={getEndPoint() ? 'location-outline' : 'search'}
						size={18}
						color='rgba(0, 0, 0, 0.8)'
					/>

					<Text style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
						{getEndPoint()
							? getEndPoint().locationName
							: "Choisir un point d'arrivée"}
					</Text>
				</Pressable>
			</TripSection>

			<TripSection
				flex={1}
				expandedTitle='Date'
				reducedTitle='Quel jour ?'
				placeholder='Choisir la date'
				expanded={expandedSection === 3}
				onPress={() => setExpandedSection(3)}
				value={
					date
						? new Date(date as string).toLocaleDateString('fr-FR', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})
						: undefined
				}
			>
				<CustomCalendar
					onDayPress={(day: string) => {
						setDate(day);
						// setTimeout(() => setExpandedSection(4), 1000);
					}}
					selectedDate={date}
				/>
			</TripSection>

			<TripSection
				flex={1 / 2}
				expandedTitle='Heure'
				reducedTitle='Quelle heure ?'
				placeholder="Choisir l'heure"
				expanded={expandedSection === 4}
				onPress={() => setExpandedSection(4)}
				value={time?.toLocaleTimeString('fr-FR', {
					hour: '2-digit',
					minute: '2-digit',
				})}
			>
				<TimePicker
					onPick={(event, selectedTime) => {
						setTime(selectedTime);
						// setTimeout(() => setExpandedSection(5), 500);
					}}
					picked={time}
				/>
			</TripSection>

			<TripSection
				flex={2 / 3}
				expandedTitle='Places disponibles'
				reducedTitle='Combien de passagers  ?'
				placeholder='Choisir'
				expanded={expandedSection === 5}
				onPress={() => {
					setExpandedSection(5);
					setSeats(1);
				}}
				value={trip.seats > 0 ? trip.seats.toString() : undefined}
			>
				<SeatPicker
					style={{ width: '100%', marginTop: 10 }}
					onAdd={(seats) => {
						setSeats(seats);
					}}
					onRemove={(seats) => {
						setSeats(seats);
					}}
					pickedSeats={trip.seats} // Nombre de passagers sélectionné
					availableSeats={4} // Définit le nombre de passagers que le conducteur souhaite prendre
					inactiveColor={'rgba(0, 0, 0, 0.3)'}
					activeColor={'rgba(0, 0, 0, 0.6)'}
				></SeatPicker>
			</TripSection>

			{/* FOOTER */}

			{tripIsValid() && (
				<View
					style={{
						position: 'absolute',
						height: 70,
						bottom: 23,
						right: 0,
						left: 0,
						marginHorizontal: 18,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingHorizontal: 18,
						borderRadius: 4,
						backgroundColor: 'rgb(255, 255, 255)',
					}}
				>
					<PressableIcon
						onPress={() => {
							resetTrip();
							setExpandedSection(1);
						}}
						label='Effacer'
						labelStyle={({ pressed }) => [
							{
								textDecorationLine: 'underline',
								color: pressed ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.8)',
							},
						]}
					/>

					<PressableIcon
						onPress={() => {
							// setDescription('Balade en ville (test 3)');
							// setVehicle('Audi R8 II LMS 5.2L');
							setDatetime({ date: date, time: time });
							router.push('/(app)/(tabs)/post-trip/confirm');
						}}
						label='Suivant'
						style={({ pressed }) => [
							{
								backgroundColor: pressed
									? 'rgba(0, 0, 0, 0.6)'
									: 'rgba(0, 0, 0, 0.8)',
								borderRadius: 5,
								paddingHorizontal: 20,
								paddingVertical: 10,
							},
						]}
						labelStyle={{ color: 'rgb(255, 255, 255)' }}
					/>
				</View>
			)}
		</SafeAreaView>
	);
}
