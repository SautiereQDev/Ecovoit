import { StateService } from './StateService';
import { User, Vehicle } from '@/types';

const initialUserState: User = {} as User;

export const userService = new StateService<User>(
	initialUserState,
	'https://api-ev-qq.pimous.dev/users/me'
);

export const vehicleService = new StateService<Vehicle[]>(
	[],
	'https://api-ev-qq.pimous.dev/users/me/vehicles'
);
