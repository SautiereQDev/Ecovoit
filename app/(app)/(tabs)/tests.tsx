import { useLocation } from '@/components/context/LocationProvider';
import Map from '@/components/map/Map';

export default function Tests() {
	const { location } = useLocation();

	return (
		<Map
			location={location}
			style={{ flex: 1 }}
		/>
	);
}
