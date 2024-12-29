import { ValidationErrors, Vehicle } from '@/types';

/**
 * Detailed action types for the register form.
 */
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

/**
 * Initial state type for the register form.
 */
export interface RegisterState {
	form: PartialUser;
	errors: ValidationErrors;
	currentPage: number;
	isSubmitting: boolean;
	isValid: boolean;
}

/**
 * Typed action creators for the register form.
 */
export const registerActions = {
	/**
	 * Action to update a field in the form.
	 * @param {keyof PartialUser} field - The field to update.
	 * @param {any} value - The value to set for the field.
	 * @returns {RegisterAction} The action object.
	 */
	updateField: (field: keyof PartialUser, value: any): RegisterAction => ({
		type: 'UPDATE_FIELD',
		field,
		value,
	}),

	/**
	 * Action to validate a field in the form.
	 * @param {keyof PartialUser} field - The field to validate.
	 * @param {string | null} error - The validation error message, or null if valid.
	 * @returns {RegisterAction} The action object.
	 */
	validateField: (
		field: keyof PartialUser,
		error: string | null
	): RegisterAction => ({
		type: 'VALIDATE_FIELD',
		field,
		error,
	}),

	/**
	 * Action to set the current page of the form.
	 * @param {number} page - The page number to set.
	 * @returns {RegisterAction} The action object.
	 */
	setPage: (page: number): RegisterAction => ({
		type: 'SET_PAGE',
		page,
	}),

	/**
	 * Action to add a vehicle to the form.
	 * @param {Vehicle} vehicle - The vehicle to add.
	 * @returns {RegisterAction} The action object.
	 */
	addVehicle: (vehicle: Vehicle): RegisterAction => ({
		type: 'ADD_VEHICLE',
		vehicle,
	}),

	/**
	 * Action to update a vehicle in the form.
	 * @param {Vehicle} vehicle - The vehicle to update.
	 * @param {number} index - The index of the vehicle to update.
	 * @returns {RegisterAction} The action object.
	 */
	updateVehicle: (vehicle: Vehicle, index: number): RegisterAction => ({
		type: 'UPDATE_VEHICLE',
		vehicle,
		index,
	}),

	/**
	 * Action to remove a vehicle from the form.
	 * @param {number} index - The index of the vehicle to remove.
	 * @returns {RegisterAction} The action object.
	 */
	removeVehicle: (index: number): RegisterAction => ({
		type: 'REMOVE_VEHICLE',
		index,
	}),

	/**
	 * Action to submit the form.
	 * @returns {RegisterAction} The action object.
	 */
	submitForm: (): RegisterAction => ({
		type: 'SUBMIT_FORM',
	}),

	/**
	 * Action to reset the form to its initial state.
	 * @returns {RegisterAction} The action object.
	 */
	resetForm: (): RegisterAction => ({
		type: 'RESET_FORM',
	}),

	/**
	 * Action to clear all validation errors in the form.
	 * @returns {RegisterAction} The action object.
	 */
	clearErrors: (): RegisterAction => ({
		type: 'CLEAR_ERRORS',
	}),
};

/**
 * Type representing the possible page numbers in the form.
 */
export type PageNumber = 1 | 2 | 3 | 4 | 5;

/**
 * Interface representing a partial user object.
 */
export interface PartialUser {
	firstName: string;
	lastName?: string;
	username: string;
	email: string;
	password: string;
	vehicles: Vehicle[];
	bio?: string;
	profilePicture: string | null;
}
