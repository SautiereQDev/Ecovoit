import { apiDelete, apiGet, apiPost } from './client';
import { GetVehiclesType, PostVehicleType, Vehicle } from '@/types';

/**
 * Fetches the vehicles for a specific user.
 *
 * @param {string} userId - The ID of the user whose vehicles are to be fetched.
 * @returns {Promise<GetVehiclesType>} A promise that resolves to the list of vehicles.
 */
export const fetchVehiclesByUser = (userId: string): Promise<GetVehiclesType> =>
	apiGet<GetVehiclesType>(`/vehicles/${userId}`);

/**
 * Adds a new vehicle for a specific user.
 *
 * @param {string} userId - The ID of the user to whom the vehicle is to be added.
 * @param {PostVehicleType} vehicleData - The data of the vehicle to be added.
 * @returns {Promise<Vehicle>} A promise that resolves to the added vehicle.
 */
export const addVehicle = (
	userId: string,
	vehicleData: PostVehicleType
): Promise<Vehicle> =>
	apiPost<PostVehicleType, any>(`/vehicles/${userId}`, vehicleData);

/**
 * Removes a vehicle for a specific user.
 *
 * @param {string} userId - The ID of the user whose vehicle is to be removed.
 * @param {string} label - The label of the vehicle to be removed.
 * @returns {Promise<void>} A promise that resolves when the vehicle is removed.
 */
export const removeVehicle = (userId: string, label: string): Promise<void> =>
	apiDelete(`/vehicles/${userId}/${label}`);

// /**
//  * Updates a vehicle for a specific user.
//  *
//  * @param {string} userId - The ID of the user whose vehicle is to be updated.
//  * @param {string} label - The label of the vehicle to be updated.
//  * @param {Partial<Vehicle>} data - The data to update the vehicle with.
//  * @returns {Promise<Vehicle>} A promise that resolves to the updated vehicle.
//  */
// export const updateVehicle = (
// 	userId: string,
// 	label: string,
// 	data: Partial<Vehicle>
// ): Promise<Vehicle> => apiPut<Vehicle>(`/vehicles/${userId}/${label}`, data);
