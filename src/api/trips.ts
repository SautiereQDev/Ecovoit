import { apiDelete, apiGet, apiPost } from './client';
import { GetTripsType, GetTripType, PatchTripsType, PostTripsType, TripParamsType } from '@/types';

/**
 * Fetches the list of trips.
 * @returns {Promise<GetTripsType>} A promise that resolves to the list of trips.
 */
export const fetchTrips = (): Promise<GetTripsType> =>
	apiGet<GetTripsType>('/trips');

/**
 * Post a trip
 * @returns {Promise<GetTripType>} A promise that resolves to the added trip.
 * @param tripData
 */
export const postTrip = (tripData: PostTripsType): Promise<GetTripsType> =>
	apiPost<PostTripsType, GetTripsType>('/trips', tripData);

/**
 * Fetches a trip by its ID.
 * @param {string} id - The ID of the trip to fetch.
 * @param {TripParamsType} params - The parameters for fetching the trip.
 * @returns {Promise<GetTripType>} A promise that resolves to the trip data.
 */
export const fetchTrip = (
	id: string,
	params: TripParamsType
): Promise<GetTripType> => apiGet<GetTripType>(` /trips/${id}`, params);

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
