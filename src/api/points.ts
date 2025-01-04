import { apiGet, apiPost } from '@/api/client';
import { EVAPI } from '@ecovoit-api/mock-adapter';

/**
 * Fetches the points of a specific trip.
 * @param {string} tripId - The ID of the trip.
 * @param params
 * @param filters
 * @param sort
 * @returns {Promise<Location[]>} - A promise that resolves to an array of locations.
 */
export const fetchTripPoints = (
	tripId: string,
	params?: EVAPI.DB.ListingOptions<EVAPI.Point>,
	filters?: EVAPI.DB.Filters<EVAPI.Point>,
	sort?: EVAPI.DB.Sort<EVAPI.Point>
): Promise<EVAPI.Point[]> =>
	apiGet<EVAPI.Point[]>(`/trips/${tripId}/points`, params, filters, sort);

/**
 * Posts a new point to a specific trip.
 * @param {string} tripId - The ID of the trip.
 * @param {PostTripsPointsType} point - The point data to post.
 * @returns {Promise<GetPointType>} - A promise that resolves to the posted point data.
 */
export const postTripPoint = (
	tripId: string,
	point: EVAPI.PointEntry
): Promise<EVAPI.Point> =>
	apiPost<EVAPI.PointEntry, EVAPI.Point>(`/trips/${tripId}/points`, point);

/**
 * Fetches the location of a specific point.
 * @param {string} pointId - The ID of the point.
 * @param filters
 * @param params
 * @param sort
 * @returns {Promise<PostTripsPointsType>} - A promise that resolves to the point data.
 */
export const fetchLocation = (
	pointId: string,
	filters?: EVAPI.DB.Filters<EVAPI.Location>,
	params?: EVAPI.DB.ListingOptions<EVAPI.Location>,
	sort?: EVAPI.DB.Sort<EVAPI.Location>
): Promise<EVAPI.Location> =>
	apiGet<EVAPI.Location>(`/points/${pointId}`, params, filters, sort);

/**
 * Deletes a specific location.
 * @param {string} pointId - The ID of the point.
 * @returns {Promise<unknown>} - A promise that resolves when the location is deleted.
 */
export const deleteLocation = (pointId: string): Promise<void> =>
	apiGet<void>(`/points/${pointId}`);

/**
 * Fetches all locations.
 * @returns {Promise<Location[]>} - A promise that resolves to an array of locations.
 */
export const fetchLocations = (
	params?: EVAPI.DB.ListingOptions<EVAPI.Location>,
	filters?: EVAPI.DB.Filters<EVAPI.Location>,
	sort?: EVAPI.DB.Sort<EVAPI.Location>
): Promise<EVAPI.Location[]> =>
	apiGet<EVAPI.Location[]>('/points/locations', params, filters, sort);
