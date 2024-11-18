// types/map.ts
export enum PointType {
	START = "start",
	WAYPOINT = "checkpoint",
	END = "end",
}

export interface Location {
	name?: string;
	longitude: number;
	latitude: number;
}

export interface Point extends Location {
	id?: number;
	trip?: number; //Id du trip correspondant
	type?: PointType;
	waitingTime?: number;
	previous?: number;
	next?: number;
}

export interface OSRMpoint extends Point {
	hint: string;
	distance: number;
}

export interface Route {
	points: OSRMpoint[];
	distance: number;
	duration: number;
	name?: string;
}
