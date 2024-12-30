import { User } from '@/src/types';

export const initialUserState: User = {
	id: 0,
	rank: 'member',
	tripsAsDriver: [],
	tripsAsPassenger: [],
	verified: false,
	username: '',
	email: '',
	password: '',
	firstName: '',
	lastName: '',
	profilePicture: null,
	bio: '',
	vehicles: [],
};
