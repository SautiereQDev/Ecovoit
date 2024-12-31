import { apiDelete, apiGet, apiPost } from './client';
import { GetTripsType, GetTripType, PatchTripsType, PostTripsType, TripParamsType } from '@/types';

/**
 * Fetches the list of trips.
 * @param {TripParamsType} params - The parameters to filter the trips.
 * @returns {Promise<GetTripsType>} A promise that resolves to the list of trips.
 */
export const fetchTrips = (params?: TripParamsType): Promise<GetTripsType> =>
	apiGet<GetTripsType>('/trips', params);

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
