import { useQuery } from 'react-query';
import { useRef } from 'react';

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

const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1';

export const useOSRMRoute = (
	departure: Location,
	arrival: Location,
	waypoints: Location[],
	onError?: (error: RouteError) => void,
	onRouteFound?: (distance: number, duration: number) => void
) => {
	const abortControllerRef = useRef<AbortController>();

	const fetchRoute = async () => {
		try {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
			abortControllerRef.current = new AbortController();

			const coordinates = [departure, ...waypoints, arrival]
				.map((loc) => `${Number(loc.longitude)},${Number(loc.latitude)}`)
				.join(';');

			const response = await fetch(
				`${OSRM_BASE_URL}/driving/${coordinates}?overview=full&geometries=polyline`,
				{ signal: abortControllerRef.current.signal }
			);

			const data: OSRMResponse = await response.json();

			if (data.code !== 'Ok') {
				throw new Error('No route found');
			}

			if (onRouteFound && data.routes[0]) {
				onRouteFound(data.routes[0].distance, data.routes[0].duration);
			}

			return data;
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				return null;
			}

			const routeError: RouteError = {
				code: 'FETCH_ERROR',
				message: "Erreur lors de la récupération de l'itinéraire",
				details: error,
			};

			onError?.(routeError);
			throw routeError;
		}
	};

	const queryKey = ['osrm-route'];

	return useQuery<OSRMResponse | null>(queryKey, fetchRoute, {
		staleTime: 0,
		cacheTime: 0,
		retry: 1,
	});
};

export default useOSRMRoute;
