// types/map.ts
export interface Coordinates {
	latitude: number;
	longitude: number;
	title?: string;
}

export interface Route {
	points: Coordinates[];
	distance: number;
	duration: number;
}
