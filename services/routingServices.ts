import { Point, Route } from "@/types/map";

/*
 * Open Source Routing Machine (OSRM) service
 * This service is used to get the route between two points
 * using the OSRM API
 */

type OSRMparams = {
	service? : 'route' | 'table' | 'match' | 'trip' | 'nearest' | 'tile'; // permet de changer le chemin le plus rapide pour le chemin le plus court
	version? : string;
	profile? : 'car' | 'bike' | 'foot';
	coordinates? : string; // au format "longitude,latitude;longitude,latitude"
	format?: 'json' |'flatbuffers';
}

export class OSRMService {
	private static readonly BASE_URL = "https://router.project-osrm.org";

	static async getRoute(
		start: Point,
		end: Point,
		waypoints: Point[] = [],
	): Promise<Route> {
		const coordinates = [start, ...waypoints, end]
			.map((point) => `${point.location[1]},${point.location[0]}`)
			.join(";");

		const params: OSRMparams = {
			service: 'route',
			version: 'v1',
			profile: 'car',
			coordinates,
			format: 'json',
		};

		const url = `${this.BASE_URL}/${params.service}/${params.version}/${params.profile}/${coordinates}?overview=full&geometries=geojson`;

		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.code !== "Ok") {
				throw new Error("Failed to get route");
			}

			return {
				points: data.routes[0].geometry.coordinates.map(
					([long, lat]: number[]) => ({
						latitude: lat,
						longitude: long,
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
