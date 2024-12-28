import {
	Filter,
	FiltreType,
	SearchTripCardType,
	searchTripFormType,
} from '@/types';

export type SearchState = {
	searchData: searchTripFormType;
	results: SearchTripCardType[];
	filters: Filter[];
	order: FiltreType;
	orderDirection: 'asc' | 'desc';
	errors: Record<string, string>;
	formIsSubmitted: boolean;
};

export const initialSearchState: SearchState = {
	searchData: {
		depart: '',
		destination: '',
		date: new Date().getTime(),
	},
	results: [],
	filters: Object.values(FiltreType).map((type) => ({
		name: type,
		active: false,
		value: 0,
	})),
	order: FiltreType.EMISSION,
	orderDirection: 'asc',
	errors: {},
	formIsSubmitted: false,
};

export type SearchAction =
	| { type: 'SET_SEARCH_DATA'; payload: Partial<searchTripFormType> }
	| { type: 'SET_RESULTS'; payload: SearchTripCardType[] }
	| { type: 'SET_FILTERS'; payload: Filter[] }
	| { type: 'SET_ORDER'; payload: FiltreType }
	| { type: 'SET_ORDER_DIRECTION'; payload: 'asc' | 'desc' }
	| { type: 'SET_ERRORS'; payload: Record<string, string> }
	| { type: 'SET_FORM_IS_SUBMITTED'; payload: boolean }
	| { type: 'RESET_SEARCH' }
	| { type: 'RESET_FILTERS' };

export function searchReducer(
	state: SearchState,
	action: SearchAction
): SearchState {
	switch (action.type) {
		case 'SET_SEARCH_DATA':
			return {
				...state,
				searchData: { ...state.searchData, ...action.payload },
			};
		case 'SET_RESULTS':
			return { ...state, results: action.payload };
		case 'SET_FILTERS':
			return { ...state, filters: action.payload };
		case 'SET_ORDER':
			return { ...state, order: action.payload };
		case 'SET_ORDER_DIRECTION':
			return { ...state, orderDirection: action.payload };
		case 'SET_ERRORS':
			return { ...state, errors: action.payload };
		case 'SET_FORM_IS_SUBMITTED':
			return { ...state, formIsSubmitted: action.payload };
		case 'RESET_SEARCH':
			return { ...state, searchData: initialSearchState.searchData };
		case 'RESET_FILTERS':
			return { ...state, filters: initialSearchState.filters };
		default:
			return state;
	}
}
