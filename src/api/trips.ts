import { apiDelete, apiGet, apiPost } from './client';
import { EVAPI } from '@ecovoit-api/mock-adapter';

/**
 * Fetches the list of trips.
 * @param {TripParamsType} params - The parameters to filter the trips.
 * @param filters - The filters to apply to the trips.
 * @param sort - The sorting to apply to the trips.
 * @returns {Promise<GetTripsType>} A promise that resolves to the list of trips.
 */
export const fetchTrips = (
	params?: EVAPI.DB.ListingOptions<EVAPI.Entry>,
	filters?: EVAPI.DB.Filters<EVAPI.Entry>,
	sort?: EVAPI.DB.Sort<EVAPI.Entry>
): Promise<EVAPI.Trip | EVAPI.Error> => {
	let url = '/trips';
	if (params) {
		url += `?${new URLSearchParams(params as Record<string, string>).toString()}`;
	}
	if (filters) {
		url += `?${new URLSearchParams(filters as Record<string, string>).toString()}`;
	}
	return apiGet<EVAPI.Trip>(url, params);
};

/**
 * Post a trip
 * @returns {Promise<GetTripType>} A promise that resolves to the added trip.
 * @param tripData
 */
export const postTrip = (
	tripData: EVAPI.TripEntry
): Promise<EVAPI.Error | EVAPI.Trip> =>
	apiPost<EVAPI.TripEntry | EVAPI.Error, EVAPI.Trip>('/trips', tripData);

/**
 * Fetches a trip by its ID.
 * @param {string} id - The ID of the trip to fetch.
 * @returns {Promise<GetTripType>} A promise that resolves to the trip data.
 */
export const fetchTrip = (id: string): Promise<EVAPI.Trip | EVAPI.Error> =>
	apiGet<EVAPI.Trip>(` /trips/${id}`);

/**
 * Deletes a trip by its ID.
 * @param {string} id - The ID of the trip to delete.
 * @returns {Promise<void>} A promise that resolves when the trip is deleted.
 */
export const deleteTrip = (id: string): Promise<void | EVAPI.Error> =>
	apiDelete(`/trips/${id}`);

/**
 * Switch the status the trip status to canceled
 * @param id
 */
export const patchTrip = (id: string): Promise<EVAPI.Review | EVAPI.Error> =>
	apiGet<EVAPI.Review>(`/trips/${id}/cancel`);
