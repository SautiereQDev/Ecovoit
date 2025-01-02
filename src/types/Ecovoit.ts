export type User = {
	id: number;
	firstName: string;
	lastName?: string;
	username: string;
	password?: string;
	email: string;
	bio?: string;
	rank: 'member' | 'moderator' | 'admin';
	verified: boolean;
	vehicles: [Vehicle?, Vehicle?, Vehicle?, Vehicle?];
	tripsAsDriver: Trip[];
	tripsAsPassenger: Trip[];
	profilePicture: string | null;
};

export type Vehicle = {
	owner?: Readonly<string>;
	label: string;
	consumption?: number | null;
	emission?: number | null;
};

export type Location = {
	name: string;
	longitude: number;
	latitude: number;
};

export type Point = {
	id?: Readonly<string>;
	trip?: Readonly<string>;
	type: 'start' | 'end' | 'checkpoint';
	location?: Location;
	waitingTime?: number;
	previous?: Readonly<string | null>;
	next?: Readonly<string | null>;
};

export type ShortPointType = {
	type: string;
	locationName: string;
	waitingTime?: number;
};

export type Trip = {
	vehicle: string | null;
	seats: number | null;
	datetime: number | null;
	points: Point[];
};

export type ShortUserType = {
	id: number;
	username: string;
	rank: 'member' | 'moderator' | 'admin';
	verified: boolean;
	stars: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | null;
};
