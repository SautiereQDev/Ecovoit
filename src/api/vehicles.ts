import { apiGet, apiPost, apiPut } from './client';
import { GetVehiclesType, PostVehiclesType, Vehicle } from '@/types';

export const fetchVehiclesByUser = (userId: string): Promise<GetVehiclesType> =>
	apiGet<GetVehiclesType>(`/vehicles/${userId}`);

export const addVehicle = (
	userId: string,
	vehicleData: PostVehiclesType
): Promise<Vehicle> => apiPost<Vehicle>(`/vehicles/${userId}`, vehicleData);

export const updateVehicle = (
	userId: string,
	label: string,
	data: Partial<Vehicle>
): Promise<Vehicle> => apiPut<Vehicle>(`/vehicles/${userId}/${label}`, data);
