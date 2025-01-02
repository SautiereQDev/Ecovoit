import MapView, { MarkerPressEvent, Region } from 'react-native-maps';
import { StyleSheet, View, ViewProps } from 'react-native';
import { PropsWithChildren, useState } from 'react';
import { LocationObject } from 'expo-location';

const DEFAULT_LATITUDE = 46.16928586861127;
const DEFAULT_LONGITUDE = -1.1222541891038418;
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.0;

interface MapProps {
	location?: LocationObject | null;
	onMarkerPress?: (e: MarkerPressEvent) => void;
}

export const Map = ({
	location,
	children,
	onMarkerPress,
	...props
}: MapProps & PropsWithChildren & ViewProps) => {
	const [region, setRegion] = useState({
		latitude: location?.coords.latitude ?? DEFAULT_LATITUDE,
		longitude: location?.coords.longitude ?? DEFAULT_LONGITUDE,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA,
	});

	const [apiUrl, setApiUrl] = useState<string>(
		`https://api-adresse.data.gouv.fr/reverse/?lon=${region.longitude}&lat=${region.latitude}`
	);

	const handleOnRegionChangeComplete = (region: Region) => {
		setRegion(region);
		setApiUrl(
			`https://api-adresse.data.gouv.fr/reverse/?lon=${region.longitude}&lat=${region.latitude}`
		);
	};

	return (
		<View style={[styles.container, props.style]}>
			<MapView
				style={styles.map}
				initialRegion={region}
				onRegionChangeComplete={handleOnRegionChangeComplete}
				onMarkerPress={onMarkerPress}
				toolbarEnabled={false}
			>
				{children}
			</MapView>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {},

	map: {
		width: '100%',
		height: '100%',
	},
});
