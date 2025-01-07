import { apiGet } from '@/api/client';
import { useQuery } from 'react-query';

export type OSRMResponse = {
	code: string;
	routes: {
		distance: number;
		duration: number;
		geometry: string;
	}[];
	waypoints: {
		location: [number, number];
		name: string;
	}[];
};

// Types
export type Location = {
	name: string;
	longitude: number;
	latitude: number;
};

export type RouteError = {
	code: 'FETCH_ERROR' | 'NO_ROUTE_FOUND' | 'INVALID_COORDINATES' | 'UNKNOWN';
	message: string;
	details?: unknown;
};

// Configuration OSRM
const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1';

export const useOSRMRoute = (
	start: Location,
	end: Location,
	waypoints: Location[],
	onError?: (error: RouteError) => void,
	onRouteFound?: (distance: number, duration: number) => void
) => {
	const formatCoordinates = (location: Location) =>
		`${Number(location.longitude)},${Number(location.latitude)}`;

	const coordinates = [
		formatCoordinates(start),
		...waypoints.map(formatCoordinates),
		formatCoordinates(end),
	].join(';');

	return useQuery<OSRMResponse>(
		['osrm-route', coordinates],
		async () => {
			try {
				const response: OSRMResponse = await apiGet(
					`${OSRM_BASE_URL}/driving/${coordinates}?overview=full&geometries=polyline`
				);

				if (response.code !== 'Ok') {
					throw new Error('No route found');
				}

				if (onRouteFound && response.routes[0]) {
					onRouteFound(
						response.routes[0].distance,
						response.routes[0].duration
					);
				}

				return response;
			} catch (error) {
				const routeError: RouteError = {
					code: 'FETCH_ERROR',
					message: "Erreur lors de la récupération de l'itinéraire",
					details: error,
				};

				if (error instanceof Error && error.message === 'No route found') {
					routeError.code = 'NO_ROUTE_FOUND';
					routeError.message = 'Aucun itinéraire trouvé entre les points';
				}

				onError?.(routeError);
				throw routeError;
			}
		},
		{
			staleTime: 5 * 60 * 1000,
			cacheTime: 30 * 60 * 1000,
			retry: 1,
		}
	);
};

export default useOSRMRoute;
