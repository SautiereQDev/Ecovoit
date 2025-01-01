import { apiDelete, apiGet, apiPost } from './client';
import {
	FiltersType,
	GetTripsType,
	GetTripType,
	PatchTripsType,
	PostTripType,
	SortType,
	TripParamsType,
} from '@/types';

/**
 * Fetches the list of trips.
 * @param {TripParamsType} params - The parameters to filter the trips.
 * @param filters - The filters to apply to the trips.
 * @param sort - The sorting to apply to the trips.
 * @returns {Promise<GetTripsType>} A promise that resolves to the list of trips.
 */
export const fetchTrips = (
	params?: TripParamsType,
	filters?: FiltersType,
	sort?: SortType
): Promise<GetTripsType> => {
	let url = '/trips';
	if (filters) {
		const filterParams = filters
			.map((filter) => `sort[${filter.field}]=${filter.value}`)
			.join('&');
		url += `?${filterParams}`;
	}
	if (sort) {
		url += `&sort=${sort.field}:${sort.direction}`;
	}
	console.log(url);
	return apiGet<GetTripsType>(url, params);
};

/**
 * Post a trip
 * @returns {Promise<GetTripType>} A promise that resolves to the added trip.
 * @param tripData
 */
export const postTrip = (tripData: PostTripType): Promise<GetTripType> =>
	apiPost<PostTripType, GetTripType>('/trips', tripData);

/**
 * Fetches a trip by its ID.
 * @param {string} id - The ID of the trip to fetch.
 * @returns {Promise<GetTripType>} A promise that resolves to the trip data.
 */
export const fetchTrip = (id: string): Promise<GetTripType> =>
	apiGet<GetTripType>(` /trips/${id}`);

/**
 * Deletes a trip by its ID.
 * @param {string} id - The ID of the trip to delete.
 * @returns {Promise<void>} A promise that resolves when the trip is deleted.
 */
export const deleteTrip = (id: string): Promise<void> =>
	apiDelete(`/trips/${id}`);

/**
 * Switch the status the trip status to canceled
 * @param id
 */
export const patchTrip = (id: string): Promise<PatchTripsType> =>
	apiGet<PatchTripsType>(`/trips/${id}/cancel`);
