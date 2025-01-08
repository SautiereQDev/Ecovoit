// src/reducers/userReducer.ts
import { User } from '@/types';

export interface UserState {
	user: User | null;
	loading: boolean;
}

export type UserAction =
	| { type: 'SET_USER'; payload: User }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'UPDATE_USER'; payload: Partial<User> };

export const initialState: UserState = {
	user: null,
	loading: false,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload, loading: false };
		case 'SET_LOADING':
			return { ...state, loading: action.payload };
		case 'UPDATE_USER':
			return { ...state, user: { ...state.user, ...action.payload } as User };
		default:
			return state;
	}
};

export default userReducer;
