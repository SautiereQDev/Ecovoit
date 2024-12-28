import { ValidationErrors, Vehicle } from '@/types';

// Types d'actions plus détaillés
export type RegisterAction =
	| { type: 'UPDATE_FIELD'; field: keyof PartialUser; value: any }
	| { type: 'VALIDATE_FIELD'; field: keyof PartialUser; error: string | null }
	| { type: 'SET_PAGE'; page: number }
	| { type: 'ADD_VEHICLE'; vehicle: Vehicle }
	| { type: 'UPDATE_VEHICLE'; vehicle: Vehicle; index: number }
	| { type: 'REMOVE_VEHICLE'; index: number }
	| { type: 'SUBMIT_FORM' }
	| { type: 'RESET_FORM' }
	| { type: 'CLEAR_ERRORS' };

// État initial typé
export interface RegisterState {
	form: PartialUser;
	errors: ValidationErrors;
	currentPage: number;
	isSubmitting: boolean;
	isValid: boolean;
}

// Actions creators typés
export const registerActions = {
	updateField: (field: keyof PartialUser, value: any): RegisterAction => ({
		type: 'UPDATE_FIELD',
		field,
		value,
	}),

	validateField: (
		field: keyof PartialUser,
		error: string | null
	): RegisterAction => ({
		type: 'VALIDATE_FIELD',
		field,
		error,
	}),

	setPage: (page: number): RegisterAction => ({
		type: 'SET_PAGE',
		page,
	}),

	addVehicle: (vehicle: Vehicle): RegisterAction => ({
		type: 'ADD_VEHICLE',
		vehicle,
	}),

	updateVehicle: (vehicle: Vehicle, index: number): RegisterAction => ({
		type: 'UPDATE_VEHICLE',
		vehicle,
		index,
	}),

	removeVehicle: (index: number): RegisterAction => ({
		type: 'REMOVE_VEHICLE',
		index,
	}),

	submitForm: (): RegisterAction => ({
		type: 'SUBMIT_FORM',
	}),

	resetForm: (): RegisterAction => ({
		type: 'RESET_FORM',
	}),

	clearErrors: (): RegisterAction => ({
		type: 'CLEAR_ERRORS',
	}),
};

export type PageNumber = 1 | 2 | 3 | 4 | 5;

export interface PartialUser {
	firstName: string;
	lastName?: string;
	username: string;
	email: string;
	password: string;
	vehicles: Vehicle[];
	biographie?: string;
	profilePicture: string | null;
}