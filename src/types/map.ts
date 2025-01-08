// types/map.ts
export enum PointType {
	START = "start",
	WAYPOINT = "checkpoint",
	END = "end",
}

export interface OSRMpoint {
	hint: string;
	distance: number;
	id?: number;
	trip?: number; //Id du trip correspondant
	type?: PointType;
	waitingTime?: number;
	previous?: number;
	next?: number;
}

export interface Route {
	points: OSRMpoint[];
	distance: number;
	duration: number;
	name?: string;
}
