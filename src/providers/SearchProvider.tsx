import React, {
	createContext,
	ReactNode,
	useContext,
	useMemo,
	useState,
} from 'react';
import { searchTripFormType } from '@/types';

interface SearchContextType {
	searchQuery: searchTripFormType;
	setSearchQuery: React.Dispatch<React.SetStateAction<searchTripFormType>>;
	reverseOrder: () => void;
}

const initialSearchQuery: searchTripFormType = {
	start: '',
	end: '',
	filters: [],
	sort: { field: 'distance', direction: 'asc' },
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [searchQuery, setSearchQuery] =
		useState<searchTripFormType>(initialSearchQuery);

	const value: SearchContextType = useMemo(
		() => ({ searchQuery, setSearchQuery, reverseOrder }),
		[searchQuery]
	);

	const filtersChanged = () => {
		// Implement logic to check if filters have changed
		throw new Error('Not implemented');
	};
	const toggleFilter = (name: string) => {
		// Implement logic to toggle filter
		throw new Error('Not implemented');
	};
	const updateFilterValue = (name: string, value: string) => {
		// Implement logic to update filter value
		throw new Error('Not implemented');
	};
	const resetFilters = () => {
		// Implement logic to reset filters
		throw new Error('Not implemented');
	};
	const reverseOrder = () => {
		setSearchQuery({
			...searchQuery,
			sort:
				searchQuery.sort.direction === 'asc'
					? { ...searchQuery.sort, direction: 'desc' }
					: { ...searchQuery.sort, direction: 'asc' },
		});
	};

	return (
		<SearchContext.Provider value={value}>{children},</SearchContext.Provider>
	);
};

export const useSearchContext = (): SearchContextType => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error('useSearchContext must be used within a SearchProvider');
	}
	return context;
};
