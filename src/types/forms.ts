import { EVAPI } from '@ecovoit-api/mock-adapter';

export interface SignInFrom {
	email: string;
	password: string;
}

export type RegisterForm = EVAPI.UserCreation & EVAPI.VehicleCreation;
