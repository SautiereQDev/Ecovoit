import MapView, { Region } from 'react-native-maps';

import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import FakeMarker from './FakeMarker';
import { useAxiosGet } from '@/src/hooks/useAxios';
import { FeatureCollection } from '@/src/types/GeoCode';
import MapHeader from './MapHeader';
import { LocationObject } from 'expo-location';
import LRDistrictsMarkers from './LRDistrictsMarker';

const DEFAULT_LATITUDE = 46.16928586861127;
const DEFAULT_LONGITUDE = -1.1222541891038418;
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.0;

interface MyMapProps {
	location?: LocationObject | null;
}

export default function MyMap({ location }: MyMapProps) {
	const [region, setRegion] = useState({
		latitude: location?.coords.latitude ?? DEFAULT_LATITUDE,
		longitude: location?.coords.longitude ?? DEFAULT_LONGITUDE,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA,
	});

	const [apiUrl, setApiUrl] = useState<string>(
		`https://api-adresse.data.gouv.fr/reverse/?lon=${region.longitude}&lat=${region.latitude}`
	);

	const [headerInputValue, setHeaderInputValue] = useState<string | undefined>(
		undefined
	);
	const [isLoading, error, apiData] = useAxiosGet<FeatureCollection>(apiUrl);

	useEffect(() => {
		if (apiData) {
			const features = apiData.features;

			features.sort((a, b) => b.properties.score - a.properties.score);

			setTimeout(() => {
				setHeaderInputValue(features[0]?.properties.label);
			}, 1000);
		}
	}, [region, apiData]);

	const handleOnRegionChangeComplete = (region: Region) => {
		setRegion(region);
		setApiUrl(
			`https://api-adresse.data.gouv.fr/reverse/?lon=${region.longitude}&lat=${region.latitude}`
		);
	};

	return (
		<View style={styles.container}>
			<MapHeader inputValue={headerInputValue} />

			<MapView
				style={styles.map}
				initialRegion={region}
				onRegionChangeComplete={handleOnRegionChangeComplete}
			>
				<LRDistrictsMarkers />
			</MapView>

			<FakeMarker
				region={region}
				shadow
				onLoading={isLoading}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
	text: {
		fontSize: 30,
	},
});
