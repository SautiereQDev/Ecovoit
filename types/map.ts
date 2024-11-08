// types/map.ts
export interface Point {
	latitude: number;
	longitude: number;
	title?: string;
}

export interface Route {
	points: Point[];
	distance: number;
	duration: number;
	name?: string;
}
