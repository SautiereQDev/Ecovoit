// types/map.ts
export interface Point {
	latitude: number;
	longitude: number;
	name?: string;
}

interface OSRMpoint extends Point {
	hint: string;
	distance: number;
}

export interface Route {
	points: OSRMpoint[];
	distance: number;
	duration: number;
	name?: string;
}
