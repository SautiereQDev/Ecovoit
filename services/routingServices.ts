// services/osrmService.ts
import { Coordinates, Route } from "@/types/map";

export class OSRMService {
	private static readonly BASE_URL = "https://router.project-osrm.org/route/v1";

	static async getRoute(
		start: Coordinates,
		end: Coordinates,
		waypoints: Coordinates[] = [],
	): Promise<Route> {
		const coordinates = [start, ...waypoints, end]
			.map((point) => `${point.longitude},${point.latitude}`)
			.join(";");

		const url = `${this.BASE_URL}/driving/${coordinates}?overview=full&geometries=geojson`;

		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.code !== "Ok") {
				throw new Error("Failed to get route");
			}

			return {
				points: data.routes[0].geometry.coordinates.map(
					([lng, lat]: number[]) => ({
						latitude: lat,
						longitude: lng,
					}),
				),
				distance: data.routes[0].distance,
				duration: data.routes[0].duration,
			};
		} catch (error) {
			console.error("Error fetching route:", error);
			throw error;
		}
	}
}
