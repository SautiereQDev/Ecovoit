export type User = {
	id: number;
	firstName: string;
	lastName?: string;
	username: string;
	email: string;
	bio?: string;
	rank: 'member' | 'moderator' | 'admin';
	verified: boolean;
	vehicles: [Vehicle?, Vehicle?, Vehicle?, Vehicle?];
	tripsAsDriver: Trip[];
	tripsAsPassenger: Trip[];
};

export type Vehicle = {
	owner: number;
	label: string | null;
	consumption: number | null;
	emission: number | null;
};

export type Point = {
	type: "start" | "end" | "checkpoint";
	locationName: string;
	previous: number | null;
	next: number | null;
};

export type Trip = {
	vehicle: string | null;
	seats: number | null;
	datetime: number | null;
	points: Point[];
};
