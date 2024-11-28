/**
 * Type definitions for the Ecovoit API.
 * ***************************************
 * @see https://doc-ev-qq.pimous.dev/
 */

export type User = {
	id: number;
	firstName: string;
	lastName: string | null;
	username: string;
	email: string;
	bio: string | null;
	rank: 'member' | 'moderator' | 'admin';
	verified: boolean;
	vehicles: Vehicle[];
	tripsAsDriver: string[];
	tripsAsPassenger: string[];
};

export type Vehicle = {
	owner: number;
	label: string;
	consumption: number | null;
	emission: number | null;
};

export type Location = {
	name: string;
	longitude: string;
	latitude: number;
};

export type Point = {
	id: string;
	trip: string;
	type: 'start' | 'end' | 'checkpoint';
	locationName: string;
	location: location;
	waitingTime: number;
	previous: number | null;
	next: number | null;
};

export type Trip = {
	id: string;
	driver: string;
	vehicle: string;
	seats: number;
	datetime: number;
	description: string | null;
	points: point[];
	distance: number | null;
	duration: number | null;
	availableSeats: number;
};

export type Review = {
	emitter: string;
	receiver: string;
	day: number;
	stars: 0 | 1 | 2 | 3 | 4 | 5;
	title: string | null;
	content: string | null;
	deletionRequested: boolean;
};

export type Passenger = {
	passenger: string;
	trip: string;
};
