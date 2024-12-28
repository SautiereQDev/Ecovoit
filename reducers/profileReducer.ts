import { ProfileAction, ProfileState } from '@/types/profile';
import { Vehicle } from '@/types';

export const initialProfileState: ProfileState = {
	completed: false,
	id: 0,
	rank: 'member',
	tripsAsDriver: [],
	tripsAsPassenger: [],
	verified: false,
	firstName: 'Quentin',
	lastName: undefined,
	username: 'Momopa',
	email: 'quentin.sautiere@etudiant.univ-lr.fr',
	password: 'Qsd!azddv34fgf',
	vehicles: [],
	biographie: undefined,
	profilePicture: null,
	errors: {},
	isValid: false,
};

export function profileReducer(
	state: ProfileState,
	action: ProfileAction
): ProfileState {
	switch (action.type) {
		case 'MODIFY_USER':
			return { ...state, ...action.payload };

		case 'SET_PROFILE_IMAGE':
			return { ...state, profilePicture: action.payload };

		case 'ADD_VEHICLE':
			if (state.vehicles.length >= 4) {
				return {
					...state,
					vehicles: [...state.vehicles, action.vehicle].slice(0, 4) as [
						(Vehicle | undefined)?,
						(Vehicle | undefined)?,
						(Vehicle | undefined)?,
						(Vehicle | undefined)?,
					],
				};
			} else {
				return state;
			}

		case 'MODIFY_VEHICLE':
			const vehicles = [...state.vehicles];
			vehicles[action.index] = action.vehicle;
			return {
				...state,
				vehicles: vehicles as [
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
				],
			};

		case 'DELETE_VEHICLE':
			return {
				...state,
				vehicles: [
					...state.vehicles.filter((_, index) => index !== action.index),
					undefined,
					undefined,
					undefined,
					undefined,
				].slice(0, 4) as [
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
				],
			};

		case 'SET_ERRORS':
			return { ...state, errors: action.errors, isValid: false };

		case 'CLEAR_ERRORS':
			return { ...state, errors: {}, isValid: true };

		case 'MODIFY_RANK':
			return { ...state, rank: action.rank };

		case 'SET_VERIFIED':
			return { ...state, verified: true };
		default:
			return state;
	}
}
