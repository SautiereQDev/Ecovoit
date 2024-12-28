import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from 'react';
import { useRouter } from 'expo-router';
import { FiltreType, SearchTripCardType } from '@/types';
import {
	initialSearchState,
	SearchAction,
	searchReducer,
} from '@/reducers/searchReducer';
import { formatDateReverse } from '@/utils/date';
import validTimestamp from 'ajv/lib/runtime/timestamp';

interface SearchContextType {
	state: typeof initialSearchState;
	dispatch: React.Dispatch<SearchAction>;
	resetSearch: () => void;
	submitSearch: () => void;
	updateFilters: (name: FiltreType, value: string) => void;
	resetFilters: () => void;
	reverseOrder: () => void;
	updateOrder: (order: FiltreType) => void;
	toggleFilter: (name: FiltreType) => void;
	updateFilterValue: (name: FiltreType, value: string) => void;
	filtersChanged: () => boolean;
	handleInputChange: (
		field: keyof typeof initialSearchState.searchData,
		value: string
	) => void;
	handleSubmit: () => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

interface SearchProviderProps {
	children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
	const router = useRouter();
	const [state, dispatch] = useReducer(searchReducer, initialSearchState);

	const validate = useCallback(
		(field: string, value: string | number) => {
			const newErrors = { ...state.errors };
			switch (field) {
				case 'depart':
				case 'destination':
					if ((value as string).length < 3 || (value as string).length > 32) {
						newErrors[field] =
							'Le champ de recherche doit contenir entre 3 et 32 caractères';
					} else {
						delete newErrors[field];
					}
					break;
				case 'date':
					if (!validTimestamp(new Date(value as number).toISOString(), true)) {
						newErrors[field] = 'Date invalide';
					} else {
						delete newErrors[field];
					}
					break;
			}
			dispatch({ type: 'SET_ERRORS', payload: newErrors });
		},
		[state.errors]
	);

	const handleInputChange = (
		field: keyof typeof initialSearchState.searchData,
		value: string
	) => {
		dispatch({ type: 'SET_SEARCH_DATA', payload: { [field]: value } });
	};

	const handleSubmit = () => {
		dispatch({ type: 'SET_FORM_IS_SUBMITTED', payload: true });
	};

	const submitSearch = useCallback(() => {
		if (
			Object.keys(state.errors).length === 0 &&
			state.searchData.depart &&
			state.searchData.destination
		) {
			router.push('/searchTrip/search');
			console.log(state.searchData);
			dispatch({ type: 'SET_RESULTS', payload: data });
		} else {
			validate('depart', state.searchData.depart);
			validate('destination', state.searchData.destination);
			validate('date', state.searchData.date);
		}
	}, [state.errors, state.searchData, router, validate]);

	useEffect(() => {
		if (state.formIsSubmitted) {
			submitSearch();
			dispatch({ type: 'SET_FORM_IS_SUBMITTED', payload: false });
		}
	}, [state.formIsSubmitted, submitSearch]);

	const data: SearchTripCardType[] = [
		{
			depart: state.searchData.depart,
			destination: state.searchData.destination,
			nom: 'Thomas',
			date: formatDateReverse(state.searchData.date),
			distance: 500,
		},
		{
			depart: state.searchData.depart,
			destination: state.searchData.destination,
			nom: 'Thomas',
			date: formatDateReverse(state.searchData.date),
			distance: 500,
		},
		{
			depart: state.searchData.depart,
			destination: state.searchData.destination,
			nom: 'Thomas',
			date: formatDateReverse(state.searchData.date),
			distance: 500,
		},
	];

	const resetFilters = useCallback(
		() => dispatch({ type: 'RESET_FILTERS' }),
		[]
	);

	const updateFilters = useCallback(
		(name: FiltreType, value: string) => {
			const numericValue = Number(value);
			if (!isNaN(numericValue)) {
				dispatch({
					type: 'SET_FILTERS',
					payload: state.filters.map((filter) =>
						filter.name === name ? { ...filter, value: numericValue } : filter
					),
				});
			}
		},
		[state.filters]
	);

	const toggleFilter = useCallback(
		(name: FiltreType) => {
			dispatch({
				type: 'SET_FILTERS',
				payload: state.filters.map((filter) =>
					filter.name === name ? { ...filter, active: !filter.active } : filter
				),
			});
		},
		[state.filters]
	);

	const updateFilterValue = useCallback(
		(name: FiltreType, value: string) => {
			const numericValue = Number(value);
			if (!isNaN(numericValue)) {
				dispatch({
					type: 'SET_FILTERS',
					payload: state.filters.map((filter) =>
						filter.name === name ? { ...filter, value: numericValue } : filter
					),
				});
			}
		},
		[state.filters]
	);

	const filtersChanged = useCallback((): boolean => {
		return state.filters.some((filter) => {
			const initialFilter = initialSearchState.filters.find(
				(initialFilter) => initialFilter.name === filter.name
			);
			return (
				initialFilter?.value !== filter.value ||
				initialFilter?.active !== filter.active
			);
		});
	}, [state.filters]);

	const isFilterActive = useMemo(
		() => state.filters.some((filter) => filter.active),
		[state.filters]
	);

	const reverseOrder = useCallback(() => {
		dispatch({
			type: 'SET_ORDER_DIRECTION',
			payload: state.orderDirection === 'asc' ? 'desc' : 'asc',
		});
	}, [state.orderDirection]);

	const updateOrder = useCallback((order: FiltreType) => {
		dispatch({ type: 'SET_ORDER', payload: order });
	}, []);

	const resetSearch = useCallback(() => {
		router.push('/(app)/(tabs)/searchTrip');
		dispatch({ type: 'RESET_SEARCH' });
	}, [router]);

	const contextValue = useMemo(
		() => ({
			state,
			dispatch,
			resetSearch,
			submitSearch,
			updateFilters,
			resetFilters,
			isFilterActive,
			reverseOrder,
			updateOrder,
			toggleFilter,
			updateFilterValue,
			filtersChanged,
			handleInputChange,
			handleSubmit,
		}),
		[
			state,
			resetSearch,
			submitSearch,
			updateFilters,
			resetFilters,
			isFilterActive,
			reverseOrder,
			updateOrder,
			toggleFilter,
			updateFilterValue,
			filtersChanged,
			handleInputChange,
			handleSubmit,
		]
	);

	return (
		<SearchContext.Provider value={contextValue}>
			{children}
		</SearchContext.Provider>
	);
};

export const useTripSearch = (): SearchContextType => {
	const context = useContext(SearchContext);
	if (context === null) {
		throw new Error('useTripSearch must be used within a SearchProvider');
	}
	return context;
};