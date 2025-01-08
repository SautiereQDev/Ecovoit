import { EVAPI } from '@ecovoit-api/mock-adapter';

export interface SignInFrom {
	email: string;
	password: string;
}

export type searchTripFormType = {
	start: string;
	end: string;
	sort: { field: string; direction: string };
	filters: { field: string; value: string }[];
};

export type RegisterForm = EVAPI.UserCreation & EVAPI.VehicleCreation;
