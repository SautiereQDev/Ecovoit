import { Location } from '@/types/Ecovoit';
import { apiGet, apiPost } from '@/api/client';
import { GetLocationsType, GetPointType, PostTripsPointsType } from '@/types';

/**
 * Fetches the points of a specific trip.
 * @param {string} tripId - The ID of the trip.
 * @returns {Promise<Location[]>} - A promise that resolves to an array of locations.
 */
export const fetchTripPoints = (tripId: string): Promise<GetLocationsType> =>
	apiGet<GetLocationsType>(`/trips/${tripId}/points`);

/**
 * Posts a new point to a specific trip.
 * @param {string} tripId - The ID of the trip.
 * @param {PostTripsPointsType} point - The point data to post.
 * @returns {Promise<GetPointType>} - A promise that resolves to the posted point data.
 */
export const postTripPoint = (
	tripId: string,
	point: PostTripsPointsType
): Promise<GetPointType> =>
	apiPost<PostTripsPointsType, GetPointType>(`/trips/${tripId}/points`, point);

/**
 * Fetches the location of a specific point.
 * @param {string} pointId - The ID of the point.
 * @returns {Promise<PostTripsPointsType>} - A promise that resolves to the point data.
 */
export const fetchLocation = (pointId: string): Promise<PostTripsPointsType> =>
	apiGet<PostTripsPointsType>(`/points/${pointId}`);

/**
 * Deletes a specific location.
 * @param {string} pointId - The ID of the point.
 * @returns {Promise<unknown>} - A promise that resolves when the location is deleted.
 */
export const deleteLocation = (pointId: string): Promise<unknown> =>
	apiGet<unknown>(`/points/${pointId}`);

/**
 * Fetches all locations.
 * @returns {Promise<Location[]>} - A promise that resolves to an array of locations.
 */
export const fetchLocations = (): Promise<GetLocationsType[]> =>
	apiGet<GetLocationsType[]>('/points/locations');
