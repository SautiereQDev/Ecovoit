import { StateService } from './StateService';
import { User } from '@/types';

const initialUserState: User = {
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

export const userService = new StateService<User>(
	initialUserState,
	'https://api-ev-qq.pimous.dev/users/me'
);
