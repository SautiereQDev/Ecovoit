// services/OSRMService.ts

interface RoutePoint {
	location: [number, number];
	name?: string;
}

interface OSRMResponse {
	routes: {
		geometry: {
			coordinates: [number, number][];
			type: string;
		};
		distance: number;
		duration: number;
	}[];
}

interface Route {
	points: { latitude: number; longitude: number }[];
	distance: number;
	duration: number;
}

export class OSRMService {
	private static readonly BASE_URL = "https://router.project-osrm.org/route/v1";

	static async getRoute(
		start: RoutePoint,
		end: RoutePoint,
		waypoints: RoutePoint[] = [],
	): Promise<Route> {
		try {
			// Construire les coordonnées pour l'URL
			const coordinates = [start, ...waypoints, end]
				.map((point) => point.location.join(","))
				.join(";");

			const url = `${this.BASE_URL}/driving/${coordinates}?overview=full&geometries=geojson`;

			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`OSRM API error: ${response.statusText}`);
			}

			const data: OSRMResponse = await response.json();
			const route = data.routes[0];

			// Convertir la géométrie GeoJSON en points
			const points = route.geometry.coordinates.map(([lng, lat]) => ({
				latitude: lat,
				longitude: lng,
			}));

			return {
				points,
				distance: route.distance,
				duration: route.duration,
			};
		} catch (error) {
			console.error("OSRM service error:", error);
			throw error;
		}
	}
}

export default OSRMService;
