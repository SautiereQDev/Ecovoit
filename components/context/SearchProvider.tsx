import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useRouter } from 'expo-router'; // Importer useRouter pour la navigation
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
	filtersChanged : () => boolean;
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

export const SearchProvider = ({ children }: SearchProviderProps) => {
	const router = useRouter();

	const initialFilters: Filter[] = Object.keys(FiltreType)
		.filter((key) => !isNaN(Number(key)))
		.map((key) => ({
			name: FiltreType[key as keyof typeof FiltreType],
			value: 0,
			active: false,
		}));

	const [searchData, setSearchData] = useState<searchTripFormType>(initialData);
	const [filters, setFilters] = useState<Filter[]>(initialFilters);
	const [order, setOrder] = useState<FiltreType>(FiltreType.emission);
	const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
	const [errors, setErrors] = useState<inputError>({});
	const [formIsSubmitted, setFormIsSubmitted] = useState<boolean>(false);

	const validate = (field: string, value: string | number) => {
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
	};

	const submitSearch = () => {
		if (
			Object.keys(errors).length === 0 &&
			searchData.depart &&
			searchData.destination
		) {
			router.push('/searchTrip/search');
			console.log(searchData);
		} else {
			validate('depart', searchData.depart);
			validate('destination', searchData.destination);
			validate('date', searchData.date);
		}
	};

	useEffect(() => {
		if (formIsSubmitted) {
			submitSearch();
			setFormIsSubmitted(false);
		}
	}, [formIsSubmitted, submitSearch]);

	const data: SearchTripCardType[] = [
		{
			depart: searchData.depart,
			destination: searchData.destination,
			nom: 'Thomas',
			date: formatDateReverse(searchData.date),
			distance: 500,
		},
		{
			depart: searchData.depart,
			destination: searchData.destination,
			nom: 'Thomas',
			date: formatDateReverse(searchData.date),
			distance: 500,
		},
		{
			depart: searchData.depart,
			destination: searchData.destination,
			nom: 'Thomas',
			date: formatDateReverse(searchData.date),
			distance: 500,
		},
	];

	//  FILTRES

	const resetFilters = () => setFilters(initialFilters);

	const updateFilters = (name: FiltreType, value: string) => {
		const numericValue = Number(value);
		if (!isNaN(numericValue)) {
			setFilters(
				filters.map((filter) =>
					filter.name === name ? { ...filter, value: numericValue } : filter
				)
			);
		}
	};

	const toggleFilter = (name: FiltreType) => {
		setFilters(
			filters.map((filter) =>
				filter.name === name ? { ...filter, active: !filter.active } : filter
			)
		);
	};

	const updateFilterValue = (name: FiltreType, value: string) => {
		const numericValue = Number(value);
		if (!isNaN(numericValue)) {
			setFilters(
				filters.map((filter) =>
					filter.name === name ? { ...filter, value: numericValue } : filter
				)
			);
		}
	};

	const filtersChanged = (): boolean => {
		return filters.some((filter) => {
			const initialFilter = initialFilters.find(
				(initialFilter) => initialFilter.name === filter.name
			);
			return (
				initialFilter?.value !== filter.value ||
				initialFilter?.active !== filter.active
			);
		});
	};

	const isFilterActive = filters.some((filter) => filter.active);

	// ORDER

	const reverseOrder = () => {
		setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
	};

	const updateOrder = (order: FiltreType) => {
		setOrder(order);
	};

	const resetSearch = () => {
		// @ts-ignore
		router.push('/searchTrip/');
		setSearchData(initialData);
	};

	return (
		<SearchContext.Provider
			value={{
				searchData,
				setSearchData,
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
			}}
		>
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
