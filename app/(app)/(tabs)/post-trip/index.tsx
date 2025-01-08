import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
	View,
	Text,
	Pressable,
	Image,
	FlatList,
	StyleSheet,
	ViewStyle,
	StyleProp,
	TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';

// TODO

// - [ ] Add types
// - [ ] Add comments
// - [ ] Add documentation
// - [ ] Add tests
// - [ ] Dispatch components and hooks into separates files

// STATIC DATA
const poi = [
	{
		id: 0,
		title: 'Gare',
		icon: 'train',
		coordinates: {
			latitude: 46.152277834882085,
			longitude: -1.145563255995512,
		},
		imageSource: require('@/assets/images/gare.jpg'),
	},
	{
		id: 1,
		title: 'Université',
		icon: 'school',
		coordinates: {
			latitude: 46.14672488301743,
			longitude: -1.1548960022628307,
		},
		imageSource: require('@/assets/images/universite.jpg'),
	},
	{
		id: 2,
		title: 'Cinéma',
		icon: 'film',
		coordinates: {
			latitude: 46.14709238571861,
			longitude: -1.1536219529807568,
		},
		imageSource: require('@/assets/images/cinema.jpg'),
	},
	{
		id: 3,
		title: 'Déchetterie',
		icon: 'trash',
		coordinates: {
			latitude: 46.161237344887624,
			longitude: -1.1140293423280325,
		},
		imageSource: require('@/assets/images/dechetterie.jpg'),
	},
	{
		id: 4,
		title: 'Aéroport',
		icon: 'airplane-outline',
		coordinates: {
			latitude: 46.17615822440976,
			longitude: -1.1939146161564087,
		},
		imageSource: require('@/assets/images/aeroport.jpg'),
	},
];

// TYPES

type CallToActionProps = {
	title?: string;
	subtitle?: string;
	icon?: keyof typeof Ionicons.glyphMap;
	containerStyle?: StyleProp<ViewStyle>;
	style: (props: {
		pressed: boolean;
	}) => StyleProp<ViewStyle> | StyleProp<ViewStyle>;
	onPress?: () => void;
};

type TabMenuProps = {
	items: any; // TODO: type
	selectedItem: number;
	setSelectedItem: (index: number) => void;
	containerStyle?: StyleProp<ViewStyle>;
	onPressItem: ({ index, item }: { index: number; item: any }) => void;
};

type PressableIconProps = {
	label?: string;
	icon?: keyof typeof Ionicons.glyphMap;
	size?: number;
	style?:
		| ((props: { pressed: boolean }) => StyleProp<ViewStyle>)
		| StyleProp<ViewStyle>;
	iconStyle?:
		| ((props: { pressed: boolean }) => StyleProp<TextStyle>)
		| StyleProp<TextStyle>;
	labelStyle?:
		| ((props: { pressed: boolean }) => StyleProp<TextStyle>)
		| StyleProp<TextStyle>;
	color?: string;
	onPress?: () => void;
};

type ToastCardProps = {
	title?: string;
	subtitle?: string;
	data?: any; // TODO: type
	isVisible: boolean;
	onClose: () => void;
	onAction: () => void;
	style: StyleProp<ViewStyle>;
};

// COMPONENTS

function CallToAction({
	title,
	subtitle,
	icon,
	containerStyle,
	style,
	onPress,
}: CallToActionProps) {
	const [pressed, setPressed] = useState(false);

	return (
		<View
			style={[
				{
					width: '100%',
				},
				containerStyle,
			]}
		>
			<Pressable
				onPressIn={() => {
					setPressed(true);
				}}
				onPressOut={() => {
					setPressed(false);
				}}
				onPress={onPress}
				style={[
					{
						width: '100%',
						height: '100%',
					},
					typeof style === 'function' ? style({ pressed }) : style,
				]}
			>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 10,
						padding: 10,
						width: '100%',
						height: '100%',
					}}
				>
					<Ionicons
						style={{ margin: 5 }}
						name={icon}
						size={34}
						color='rgba(0, 0, 0, 0.8)'
					/>
					<View
						style={{
							flex: 1,
							flexDirection: 'column',
						}}
					>
						<Text
							style={{
								fontSize: 18,
								fontWeight: 'bold',
								color: 'rgba(0, 0, 0, 0.8)',
							}}
						>
							{title}
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontWeight: 'thin',
								color: 'rgba(0, 0, 0, 0.4)',
							}}
						>
							{subtitle}
						</Text>
					</View>
				</View>
			</Pressable>
		</View>
	);
}

function TabMenu({
	items,
	containerStyle,
	onPressItem,
	selectedItem,
	setSelectedItem,
}: TabMenuProps) {
	return (
		<View style={[{}, containerStyle]}>
			<FlatList
				data={items}
				renderItem={({ item, index }) => (
					<Pressable
						onPress={() => {
							setSelectedItem(index);
							onPressItem({ index, item });
						}}
						style={{
							position: 'relative',
							height: '100%',
							flexDirection: 'column',
							alignItems: 'center',
							marginRight: index === items.length - 1 ? 0 : 20,
						}}
					>
						<Ionicons
							name={item.icon as any}
							size={20}
							color={
								selectedItem === index
									? 'rgba(0, 0, 0, 0.6)'
									: 'rgba(0, 0, 0, 0.3)'
							}
						/>
						<Text
							style={{
								fontSize: 14,
								color:
									selectedItem === index
										? 'rgba(0, 0, 0, 0.6)'
										: 'rgba(0, 0, 0, 0.3)',
							}}
						>
							{item.title}
						</Text>
					</Pressable>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

export function PressableIcon({
	label,
	icon,
	size,
	style,
	iconStyle,
	labelStyle,
	color,
	onPress,
}: PressableIconProps) {
	const [pressed, setPressed] = useState(false);

	return (
		<Pressable
			onPressIn={() => setPressed(true)}
			onPressOut={() => setPressed(false)}
			onPress={onPress}
			style={[{}, typeof style === 'function' ? style({ pressed }) : style]}
		>
			<View
				style={{
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{icon && (
					<Ionicons
						name={icon}
						size={size}
						color={color}
						style={[
							{ width: size, height: size },
							typeof iconStyle === 'function'
								? iconStyle({ pressed })
								: iconStyle,
						]}
					/>
				)}
				{label && (
					<Text
						style={[
							{},
							typeof labelStyle === 'function'
								? labelStyle({ pressed })
								: labelStyle,
						]}
					>
						{label}
					</Text>
				)}
			</View>
		</Pressable>
	);
}

function ToastCard({
	data,
	subtitle,
	style,
	isVisible,
	onAction,
	onClose,
}: ToastCardProps) {
	return (
		<View style={[{ display: isVisible ? 'flex' : 'none' }, style]}>
			<View style={{ position: 'relative', width: '55%', height: '100%' }}>
				<Image
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						borderBottomLeftRadius: 15,
						borderTopLeftRadius: 15,
					}}
					source={data.imageSource}
				/>
				<PressableIcon
					onPress={onClose}
					icon='close'
					size={14}
					color='white'
					style={({ pressed }) => [
						{
							position: 'absolute',
							top: 8,
							left: 8,
							padding: 2,
							backgroundColor: pressed
								? 'rgba(0, 0, 0, 0.4)'
								: 'rgba(0, 0, 0, 0.5)',
							borderRadius: 100,
						},
					]}
				/>
			</View>

			<View style={{ padding: 8, flex: 1 }}>
				<Text
					style={{
						fontSize: 18,
						fontWeight: 'bold',
						color: 'rgba(0, 0, 0, 0.8)',
					}}
				>
					{data.title}
				</Text>

				<Text
					style={{
						fontSize: 12,
						fontWeight: 'thin',
						color: 'rgba(0, 0, 0, 0.4)',
					}}
				>
					{subtitle}
				</Text>

				<PressableIcon
					onPress={onAction}
					label="J'y vais"
					style={({ pressed }) => [
						{
							backgroundColor: pressed
								? 'rgba(0, 0, 0, 0.3)'
								: 'rgba(0, 0, 0, 0.1)',
							width: 70,
							borderRadius: 100,
							padding: 2,
							marginTop: 10,
							boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
						},
					]}
				/>
			</View>
		</SafeAreaView>
	);
}

// HOOKS

function useMap() {
	const DEFAULT_LATITUDE_DELTA = 0.006;
	const DEFAULT_LONGITUDE_DELTA = 0.004358924925327301;

	const setInitialRegion = () => {
		return {
			latitude: poi[0].coordinates.latitude,
			longitude: poi[0].coordinates.longitude,
			latitudeDelta: DEFAULT_LATITUDE_DELTA,
			longitudeDelta: DEFAULT_LONGITUDE_DELTA,
		};
	};

	const [region, setRegion] = useState(setInitialRegion);

	const updateRegion = (latitude: number, longitude: number) => {
		setRegion({
			latitude,
			longitude,
			latitudeDelta: DEFAULT_LATITUDE_DELTA,
			longitudeDelta: DEFAULT_LONGITUDE_DELTA,
		});
	};

	return {
		region,
		updateRegion,
	};
}

function useTabMenu() {
	const [selectedTab, setSelectedTab] = useState(0);

	return {
		selectedTab,
		setSelectedTab,
	};
}

function useToastCard() {
	const [isVisible, setIsVisible] = useState(false);

	const showToastCard = () => {
		setIsVisible(true);
	};

	const hideToastCard = () => {
		setIsVisible(false);
	};

	return {
		isVisible,
		showToastCard,
		hideToastCard,
	};
}

// MAIN COMPONENT
export default function Index({}) {
	const { region, updateRegion } = useMap();
	const { selectedTab, setSelectedTab } = useTabMenu();
	const { isVisible, showToastCard, hideToastCard } = useToastCard();

	// const [apiUrl, setApiUrl] = useState<string>(
	// 	`https://api-adresse.data.gouv.fr/reverse/?lon=${region.longitude}&lat=${region.latitude}`
	// );

	return (
		<SafeAreaView
			style={{
				padding: 8,
				flex: 1,
				backgroundColor: 'white',
				position: 'relative',
			}}
		>
			<Image
				source={require('@/assets/images/bg-post-trip.jpg')}
				style={{
					alignSelf: 'center',
					objectFit: 'cover',
					width: '100%',
					height: 200,
					borderRadius: 10,
				}}
			/>

			<CallToAction
				title='Vous allez quelque part ?'
				subtitle='Les Minimes, Aytré ...'
				icon='compass-outline'
				containerStyle={styles.ctaContainer}
				style={({ pressed }) => [
					styles.cta,
					{
						backgroundColor: pressed
							? 'rgba(0, 0, 0, 0.2)'
							: 'rgba(151, 151, 151, 0.1)',
					},
				]}
				onPress={() => {
					router.push('/(app)/(tabs)/post-trip/start');
				}}
			/>

			<TabMenu
				items={poi}
				selectedItem={selectedTab}
				setSelectedItem={setSelectedTab}
				onPressItem={({ item }) => {
					updateRegion(item.coordinates.latitude, item.coordinates.longitude);
					setSelectedTab(item.id);
				}}
				containerStyle={styles.tabMenuContainer}
			/>

			<MapView
				style={{
					flex: 1,
				}}
				initialRegion={region}
				region={region}
				toolbarEnabled={false}
			>
				{poi.map((item, index) => (
					<Marker
						key={index}
						coordinate={item.coordinates}
						onPress={() => {
							setSelectedTab(item.id);
							showToastCard();
						}}
					>
						<PressableIcon
							icon={item.icon as any}
							size={25}
							color={
								item.id === selectedTab
									? 'rgba(0, 0, 0, 0.6)'
									: 'rgba(0, 0, 0, 0.3)'
							}
							style={styles.mapMarker}
						/>
					</Marker>
				))}
			</MapView>

			<ToastCard
				data={poi[selectedTab]}
				isVisible={isVisible}
				onClose={hideToastCard}
				subtitle='La Rochelle'
				style={styles.toastCard}
				onAction={() => alert('Fonctionnalité non implémentée')} // TODO: implement
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	ctaContainer: {
		position: 'absolute',
		alignSelf: 'center',
		top: 165,
		height: 90,
		borderRadius: 100,
		backgroundColor: 'white',
		padding: 8,
	},
	cta: {
		borderRadius: 100,
		boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
	},
	tabMenuContainer: {
		marginTop: 60,
		borderBottomColor: 'rgba(0, 0, 0, 0.1)',
		borderBottomWidth: 1,
		paddingBottom: 10,
	},
	mapMarker: {
		backgroundColor: 'white',
		padding: 5,
		borderRadius: 100,
		boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
	},
	toastCard: {
		position: 'absolute',
		flexDirection: 'row',
		bottom: 30,
		alignSelf: 'center',
		width: '80%',
		height: 100,
		boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
		borderRadius: 15,
		backgroundColor: 'white',
	},
});
