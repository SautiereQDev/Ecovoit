import { RegisterAction, RegisterState } from '@/types';

export const initialRegisterState: RegisterState = {
	form: {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		vehicles: [],
		bio: '',
		profilePicture: null,
		id: 0,
		rank: 'member',
		verified: false,
		tripsAsDriver: [],
		tripsAsPassenger: [],
	},
	errors: {},
	currentPage: 1,
	isSubmitting: false,
	isValid: false,
};

export function registerReducer(
	state: RegisterState,
	action: RegisterAction
): RegisterState {
	switch (action.type) {
		case 'UPDATE_FIELD':
			return {
				...state,
				form: {
					...state.form,
					[action.field]: action.value,
				},
			};
		case 'SET_ERRORS':
			return {
				...state,
				errors: action.errors,
			};
		case 'SUBMIT_FORM':
			return {
				...state,
				isSubmitting: true,
			};
		case 'SUBMIT_SUCCESS':
			return {
				...state,
				isSubmitting: false,
				isValid: true,
			};
		case 'SUBMIT_FAILURE':
			return {
				...state,
				isSubmitting: false,
				isValid: false,
				errors: action.errors,
			};
		case 'SET_SUBMITTING':
			return {
				...state,
				isSubmitting: action.value,
			};
		case 'SET_VALID':
			return {
				...state,
				isValid: action.value,
			};
		default:
			return state;
	}
}
