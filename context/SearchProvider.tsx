import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useRouter } from 'expo-router';
import {
	Filter,
	FiltreType,
	SearchTripCardType,
	searchTripFormType,
} from '@/types';
import { formatDateReverse } from '@/utils/date';
import validTimestamp from 'ajv/lib/runtime/timestamp';

interface SearchContextType {
	searchData: searchTripFormType;
	setSearchData: React.Dispatch<React.SetStateAction<searchTripFormType>>;
	resetSearch: () => void;
	submitSearch: () => void;
	errors: inputError;
	setErrors: React.Dispatch<React.SetStateAction<inputError>>;
	filters: Filter[];
	updateFilters: (name: FiltreType, value: string) => void;
	resetFilters: () => void;
	isFilterActive: boolean;
	reverseOrder: () => void;
	orderDirection: 'asc' | 'desc';
	order: FiltreType;
	updateOrder: (order: FiltreType) => void;
	toggleFilter: (name: FiltreType) => void;
	updateFilterValue: (name: FiltreType, value: string) => void;
	filtersChanged: () => boolean;
	results: SearchTripCardType[];
}

const SearchContext = createContext<SearchContextType | null>(null);

interface SearchProviderProps {
	children: ReactNode;
}

const initialData = {
	depart: '',
	destination: '',
	date: new Date().getTime(),
};

type inputError = {
	[key: string]: string;
};

type Filtre = {
	name: FiltreType;
	value: number;
	active: boolean;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
	const router = useRouter();

	const initialFilters: Filtre[] = Object.values(FiltreType).map((type) => ({
		name: type,
		active: false,
		value: 0,
	}));

	const [searchFormData, setSearchFormData] =
		useState<searchTripFormType>(initialData);
	const [results, setResults] = useState<SearchTripCardType[]>([]);
	const [filters, setFilters] = useState<Filter[]>(initialFilters);
	const [order, setOrder] = useState<FiltreType>(FiltreType.EMISSION);
	const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
	const [errors, setErrors] = useState<inputError>({});
	const [formIsSubmitted, setFormIsSubmitted] = useState<boolean>(false);

	const validate = useCallback((field: string, value: string | number) => {
		const newErrors = { ...errors };
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
		setErrors(newErrors);
	}, [errors]);

	const submitSearch = useCallback(() => {
		if (
			Object.keys(errors).length === 0 &&
			searchFormData.depart &&
			searchFormData.destination
		) {
			router.push('/searchTrip/search');
			console.log(searchFormData);
			setResults(data);
		} else {
			validate('depart', searchFormData.depart);
			validate('destination', searchFormData.destination);
			validate('date', searchFormData.date);
		}
	}, [errors, searchFormData, router, validate]);

	useEffect(() => {
		if (formIsSubmitted) {
			submitSearch();
			setFormIsSubmitted(false);
		}
	}, [formIsSubmitted, submitSearch]);

	const data: SearchTripCardType[] = [
		{
			depart: searchFormData.depart,
			destination: searchFormData.destination,
			nom: 'Thomas',
			date: formatDateReverse(searchFormData.date),
			distance: 500,
		},
		{
			depart: searchFormData.depart,
			destination: searchFormData.destination,
			nom: 'Thomas',
			date: formatDateReverse(searchFormData.date),
			distance: 500,
		},
		{
			depart: searchFormData.depart,
			destination: searchFormData.destination,
			nom: 'Thomas',
			date: formatDateReverse(searchFormData.date),
			distance: 500,
		},
	];

	const resetFilters = useCallback(() => setFilters(initialFilters), [initialFilters]);

	const updateFilters = useCallback((name: FiltreType, value: string) => {
		const numericValue = Number(value);
		if (!isNaN(numericValue)) {
			setFilters((filters) =>
				filters.map((filter) =>
					filter.name === name ? { ...filter, value: numericValue } : filter
				)
			);
		}
	}, []);

	const toggleFilter = useCallback((name: FiltreType) => {
		setFilters((filters) =>
			filters.map((filter) =>
				filter.name === name ? { ...filter, active: !filter.active } : filter
			)
		);
	}, []);

	const updateFilterValue = useCallback((name: FiltreType, value: string) => {
		const numericValue = Number(value);
		if (!isNaN(numericValue)) {
			setFilters((filters) =>
				filters.map((filter) =>
					filter.name === name ? { ...filter, value: numericValue } : filter
				)
			);
		}
	}, []);

	const filtersChanged = useCallback((): boolean => {
		return filters.some((filter) => {
			const initialFilter = initialFilters.find(
				(initialFilter) => initialFilter.name === filter.name
			);
			return (
				initialFilter?.value !== filter.value ||
				initialFilter?.active !== filter.active
			);
		});
	}, [filters, initialFilters]);

	const isFilterActive = useMemo(
		() => filters.some((filter) => filter.active),
		[filters]
	);

	const reverseOrder = useCallback(() => {
		setOrderDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
	}, []);

	const updateOrder = useCallback((order: FiltreType) => {
		setOrder(order);
	}, []);

	const resetSearch = useCallback(() => {
		router.push('/(app)/(tabs)/searchTrip');
		setSearchFormData(initialData);
	}, [router]);

	const contextValue = useMemo(
		() => ({
			searchData: searchFormData,
			setSearchData: setSearchFormData,
			resetSearch,
			submitSearch,
			errors,
			setErrors,
			filters,
			updateFilters,
			resetFilters,
			isFilterActive,
			reverseOrder,
			orderDirection,
			order,
			updateOrder,
			toggleFilter,
			updateFilterValue,
			filtersChanged,
			results,
		}),
		[
			searchFormData,
			resetSearch,
			submitSearch,
			errors,
			filters,
			updateFilters,
			resetFilters,
			isFilterActive,
			reverseOrder,
			orderDirection,
			order,
			updateOrder,
			toggleFilter,
			updateFilterValue,
			filtersChanged,
			results,
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
		throw new Error('useSearchData must be used within a SearchProvider');
	}
	return context;
};