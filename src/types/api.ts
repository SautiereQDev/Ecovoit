import { Point, ShortPointType, ShortUserType, Vehicle } from '@/types/Ecovoit';
import uri from 'ajv/lib/runtime/uri';

/**
 * Type for the payload of the POST /users endpoint.
 */
export type PostUsersType = {
	firstName: string;
	lastName?: string;
	username: string;
	email: string;
	password: string;
	bio?: string;
};

/**
 * Type for the response of the GET /users/{id} endpoint.
 */
export type GetUserType = {
	id?: Readonly<number>;
	username: string;
	bio?: string;
	rank?: Readonly<'member' | 'moderator' | 'admin'>;
	verified: Readonly<boolean>;
	vehicles: readonly Vehicle[];
	tripsAsDriver: readonly string[]; // id of trips
	travelledDistance: Readonly<number>;
	tripCount: Readonly<number>;
	drivenPassengerCount: Readonly<number>;
	stars: Readonly<0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | null>; // average rating
};

/**
 * Type for the response of the GET /users endpoint.
 */
export type GetUsersType = GetUserType[];

/**
 * Type for the response of the GET /users/me endpoint.
 */
export type GetConnectedUserType = {
	id?: Readonly<number>;
	firstName: string;
	lastName?: string;
	username: string;
	email: string;
	bio?: string;
	rank?: Readonly<'member' | 'moderator' | 'admin'>;
	verified: Readonly<boolean>;
	vehicles: readonly Vehicle[];
	tripsAsDriver: readonly string[]; // id of trips
	tripsAsPassenger: readonly string[]; // id of trips
	travelledDistance: Readonly<number>;
	tripCount: Readonly<number>;
	drivenPassengerCount: Readonly<number>;
	stars: Readonly<0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | null>; // average rating
};

/**
 * Type for the response of the GET /vehicles/{user} endpoint.
 */
export type GetVehiclesType = Vehicle[];

/**
 * Type for the payload of the POST /vehicles/{user} endpoint.
 */
export type PostVehicleType = {
	label: string;
	consumption?: number | null;
	emission?: number | null;
};

/**
 * Type for the response of the GET /trips endpoint.
 */
export type GetTripsType = GetTripType[];

/**
 * Type for the payload of the POST /trips endpoint.
 */
export type PostTripsType = {
	vehicle: string; // vehicle label
	seats: number;
	datetime: number;
	description?: string | null;
	points: readonly ShortPointType[];
};

/**
 * Type for the response of the GET /trips/{id} endpoint.
 */
export type GetTripType = {
	id: Readonly<string>;
	driver?: Readonly<ShortUserType>;
	vehicle: string; // vehicle label
	seats: number;
	datetime: number;
	description?: string | null;
	points: readonly Point[];
	distance: Readonly<number | null>;
	duration: Readonly<number | null>;
	cancelled: Readonly<boolean>;
	availableSeats: Readonly<number>;
	status: Readonly<'upcoming' | 'ongoing' | 'completed' | 'cancelled'>;
};

/**
 * Type for the payload of the PATCH /trips/{id}/cancel endpoint.
 */
export type PatchTripsType = {
	emitter?: Readonly<string>; // username
	receiver?: Readonly<string>; // username
	day?: Readonly<number>;
	stars: Readonly<0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5>;
	title: string | null;
	content: string | null;
	deletionRequested: Readonly<boolean>;
};

/**
 * Type for the response of the GET /trips/{id}/points endpoint.
 */
export type GetTripsPointsType = Point[];

/**
 * Type for the payload of the POST /trips/{id}/points endpoint.
 */
export type PostTripsPointsType = {
	// TODO: To be done once the documentation is fixed
};

/**
 * Type for the response of the GET /points/{id} endpoint.
 */
export type GetPointsType = Point;

/**
 * Type for the response of the GET /points/location endpoint.
 */
export type GetPointsLocationType = Location;

/**
 * Type for the payload of the POST /passengers/{trip} endpoint.
 */
export type PostPassengersType = {
	passenger: Readonly<string>; // passenger id
	trip: Readonly<string>; // trip id
};

/**
 * Type for the error response.
 */
export type EVErrorType = {
	type: typeof uri | 'about:blank';
	title: string;
	status: number;
	detail: string;
	instance: string;
};
