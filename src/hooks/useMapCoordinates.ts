import { Region } from 'react-native-maps';
import { EVAPI } from '@ecovoit-api/mock-adapter';

export const useMapCoordinates = (
	departure: EVAPI.Location,
	arrival: EVAPI.Location,
	waypoints: EVAPI.Location[]
) => {
	const calculateInitialRegion = (): Region => {
		const locations = [departure, ...waypoints, arrival];
		const lats = locations.map((l) => Number(l.latitude));
		const lngs = locations.map((l) => Number(l.longitude));

		const minLat = Math.min(...lats);
		const maxLat = Math.max(...lats);
		const minLng = Math.min(...lngs);
		const maxLng = Math.max(...lngs);

		const latDelta = (maxLat - minLat) * 1.5 || 0.0922;
		const lngDelta = (maxLng - minLng) * 1.5 || 0.0421;

		return {
			latitude: (minLat + maxLat) / 2,
			longitude: (minLng + maxLng) / 2,
			latitudeDelta: Math.max(latDelta, 0.0922),
			longitudeDelta: Math.max(lngDelta, 0.0421),
		};
	};

	return {
		initialRegion: calculateInitialRegion(),
	};
};

export default useMapCoordinates;
