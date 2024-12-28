import { User, Vehicle } from '@/types/Ecovoit';

export interface ProfileState extends User {
	completed: boolean;
	errors: object;
	isValid: boolean;
}

export type ProfileAction =
	| { type: 'MODIFY_USER'; payload: User }
	| { type: 'SET_PROFILE_IMAGE'; payload: string | null }
	| { type: 'ADD_VEHICLE'; vehicle: Vehicle }
	| { type: 'MODIFY_VEHICLE'; vehicle: Vehicle; index: number }
	| { type: 'DELETE_VEHICLE'; index: number }
	| { type: 'SET_ERRORS'; errors: object }
	| { type: 'CLEAR_ERRORS' }
	| { type: 'MODIFY_RANK'; rank: 'member' | 'moderator' | 'admin' }
	| { type: 'SET_VERIFIED' };
