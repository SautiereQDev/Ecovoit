import { apiDelete, apiPost } from '@/api/client';
import { EVAPI } from '@ecovoit-api/mock-adapter';

export const postPassenger = (tripId: string): Promise<EVAPI.Passenger> => {
	return apiPost<void, EVAPI.Passenger>(`/passengers/${tripId}`);
};

export const deletePassenger = (tripId: string): Promise<void> => {
	return apiDelete(`/passengers/${tripId}`);
};
