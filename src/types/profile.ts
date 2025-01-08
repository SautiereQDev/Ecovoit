import { User, Vehicle } from '@/types/Ecovoit';

/**
 * Interface representing the state of a user profile.
 * @extends User
 */
export interface ProfileState extends User {
	/** Indicates if the profile is completed. */
	completed: boolean;
	/** Object containing any errors related to the profile. */
	errors: object;
	/** Indicates if the profile is valid. */
	isValid: boolean;
}

/**
 * Type representing the possible actions for the profile state.
 */
export type ProfileAction =
	| { type: 'MODIFY_USER'; payload: User } // Action to modify the user details.
	| { type: 'SET_PROFILE_IMAGE'; payload: string | null } // Action to set the profile image.
	| { type: 'ADD_VEHICLE'; vehicle: Vehicle } // Action to add a vehicle to the profile.
	| { type: 'MODIFY_VEHICLE'; vehicle: Vehicle; index: number } // Action to modify a vehicle in the profile.
	| { type: 'DELETE_VEHICLE'; index: number } // Action to delete a vehicle from the profile.
	| { type: 'SET_ERRORS'; errors: object } // Action to set errors in the profile.
	| { type: 'CLEAR_ERRORS' } // Action to clear all errors in the profile.
	| { type: 'MODIFY_RANK'; rank: 'member' | 'moderator' | 'admin' } // Action to modify the rank of the user.
	| { type: 'SET_VERIFIED' }; // Action to set the profile as verified.