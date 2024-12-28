import { PartialUser, RegisterAction, RegisterState } from '@/types/register';

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

// Actions plus spécifiques
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

const setCurrentPage = (state: RegisterState, page: number): RegisterState => ({
	...state,
	currentPage: page,
	// Reset les erreurs lors du changement de page
	errors: {},
});

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
