import { PartialUser, RegisterAction, RegisterState } from '@/types/register';

/**
 * The initial state for the register form.
 * @type {RegisterState}
 */
export const initialRegisterState: RegisterState = {
	form: {
		firstName: 'Quentin',
		lastName: undefined,
		username: 'Momopa',
		email: 'quentin.sautiere@etudiant.univ-lr.fr',
		password: 'Qsd!azddv34fgf',
		vehicles: [],
		biographie: undefined,
		profilePicture: null,
	},
	errors: {},
	currentPage: 1,
	isSubmitting: false,
	isValid: false,
};

/**
 * Updates a specific field in the form.
 * @param {RegisterState} state - The current state of the register form.
 * @param {keyof PartialUser} field - The field to update.
 * @param {any} value - The value to set for the field.
 * @returns {RegisterState} The new state of the register form.
 */
const updateFormField = (
	state: RegisterState,
	field: keyof PartialUser,
	value: any
): RegisterState => ({
	...state,
	form: {
		...state.form,
		[field]: value,
	},
});

/**
 * Validates a specific field in the form.
 * @param {RegisterState} state - The current state of the register form.
 * @param {keyof PartialUser} field - The field to validate.
 * @param {string | null} error - The validation error message, or null if valid.
 * @returns {RegisterState} The new state of the register form.
 */
const validateFormField = (
	state: RegisterState,
	field: keyof PartialUser,
	error: string | null
): RegisterState => ({
	...state,
	errors: error
		? { ...state.errors, [field]: error }
		: { ...state.errors, [field]: undefined },
	isValid: !error && Object.keys(state.errors).length === 0,
});

/**
 * Sets the current page of the form.
 * @param {RegisterState} state - The current state of the register form.
 * @param {number} page - The page number to set.
 * @returns {RegisterState} The new state of the register form.
 */
const setCurrentPage = (state: RegisterState, page: number): RegisterState => ({
	...state,
	currentPage: page,
	// Reset errors when changing page
	errors: {},
});

/**
 * Reducer function to manage the state of the register form.
 * @param {RegisterState} state - The current state of the register form.
 * @param {RegisterAction} action - The action to perform on the state.
 * @returns {RegisterState} The new state of the register form.
 */
export function registerReducer(
	state: RegisterState,
	action: RegisterAction
): RegisterState {
	switch (action.type) {
		case 'UPDATE_FIELD':
			return updateFormField(state, action.field, action.value);

		case 'VALIDATE_FIELD':
			return validateFormField(state, action.field, action.error);

		case 'SET_PAGE':
			return setCurrentPage(state, action.page);

		case 'ADD_VEHICLE':
			return {
				...state,
				form: {
					...state.form,
					vehicles: [...state.form.vehicles, action.vehicle],
				},
			};

		case 'UPDATE_VEHICLE':
			return {
				...state,
				form: {
					...state.form,
					vehicles: state.form.vehicles.map((v, i) =>
						i === action.index ? action.vehicle : v
					),
				},
			};

		case 'REMOVE_VEHICLE':
			return {
				...state,
				form: {
					...state.form,
					vehicles: state.form.vehicles.filter((_, i) => i !== action.index),
				},
			};

		case 'SUBMIT_FORM':
			return {
				...state,
				isSubmitting: true,
			};

		case 'RESET_FORM':
			return initialRegisterState;

		case 'CLEAR_ERRORS':
			return {
				...state,
				errors: {},
				isValid: true,
			};

		default:
			return state;
	}
}