import { StateService } from './StateService';
import { User, Vehicle } from '@/types';
import { initialUserState } from '@/utils';

export const userService = new StateService<User, User>(
	initialUserState,
	'https://api-ev-qq.pimous.dev/users/me'
);

export const usersService = new StateService<User, User[]>(
	[{ ...initialUserState }],
	'https://api-ev-qq.pimous.dev/users/'
);

export const vehiclesService = new StateService<Vehicle, Vehicle>(
	{ ...(initialUserState.vehicles[0] as Vehicle) },
	'https://api-ev-qq.pimous.dev/vehicles',
	['user'], // required parameters
	['label'] // optional parameters
);
