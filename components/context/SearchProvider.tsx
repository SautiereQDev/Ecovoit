import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'expo-router'; // Importer useRouter pour la navigation
import { searchTripFormType } from '@/types';

interface SearchContextType {
	searchData: searchTripFormType;
	setSearchData: React.Dispatch<React.SetStateAction<searchTripFormType>>;
	resetSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
	children: ReactNode;
}

const initialData = {
	depart: '',
	destination: '',
	date: new Date().getTime(),
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
	const [searchData, setSearchData] = useState<searchTripFormType>(initialData);
	const router = useRouter();

	const resetSearch = () => {
		// @ts-ignore
		router.push('/searchTrip/');
		setSearchData(initialData);
	};

	return (
		<SearchContext.Provider value={{ searchData, setSearchData, resetSearch }}>
			{children}
		</SearchContext.Provider>
	);
};

export const useTripSearch = (): SearchContextType => {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error('useSearchData must be used within a SearchProvider');
	}
	return context;
};
