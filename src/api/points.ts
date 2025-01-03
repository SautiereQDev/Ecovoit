import { apiGet, apiPost } from '@/api/client';
import { EVAPI } from '@ecovoit-api/mock-adapter';

/**
 * Fetches the points of a specific trip.
 * @param {string} tripId - The ID of the trip.
 * @returns {Promise<Location[]>} - A promise that resolves to an array of locations.
 */
export const fetchTripPoints = (
	tripId: string
): Promise<EVAPI.Location | EVAPI.Error> =>
	apiGet<EVAPI.Location | EVAPI.Error>(`/trips/${tripId}/points`);

/**
 * Posts a new point to a specific trip.
 * @param {string} tripId - The ID of the trip.
 * @param {PostTripsPointsType} point - The point data to post.
 * @returns {Promise<GetPointType>} - A promise that resolves to the posted point data.
 */
export const postTripPoint = (
	tripId: string,
	point: EVAPI.PointEntry
): Promise<EVAPI.Point | EVAPI.Error> =>
	apiPost<EVAPI.PointEntry, EVAPI.Point>(`/trips/${tripId}/points`, point);

/**
 * Fetches the location of a specific point.
 * @param {string} pointId - The ID of the point.
 * @returns {Promise<PostTripsPointsType>} - A promise that resolves to the point data.
 */
export const fetchLocation = (
	pointId: string
): Promise<EVAPI.Location | EVAPI.Error> =>
	apiGet<EVAPI.Location | EVAPI.Error>(`/points/${pointId}`);

/**
 * Deletes a specific location.
 * @param {string} pointId - The ID of the point.
 * @returns {Promise<unknown>} - A promise that resolves when the location is deleted.
 */
export const deleteLocation = (pointId: string): Promise<void | EVAPI.Error> =>
	apiGet<void>(`/points/${pointId}`);

/**
 * Fetches all locations.
 * @returns {Promise<Location[]>} - A promise that resolves to an array of locations.
 */
export const fetchLocations = (): Promise<EVAPI.Location | EVAPI.Error> =>
	apiGet<EVAPI.Location>('/points/locations');
