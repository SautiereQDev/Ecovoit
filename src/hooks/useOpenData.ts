import { useEffect, useState } from 'react';
import { useAxiosGet } from './useAxios';
import { OpenDataCollection } from '@/types/OpenData';

export function useOpenDataLR<T>(dataset: string) {
	const apiUrl = `https://opendata.agglo-larochelle.fr/d4c/api/records/1.0/search/dataset=${dataset}&facet=id`;
	const [isLoading, error, apiData] = useAxiosGet<OpenDataCollection<T> | null>(
		apiUrl
	);
	const [openData, setOpenData] = useState<OpenDataCollection<T> | null>(null);

	useEffect(() => {
		if (apiData) {
			setOpenData(apiData);
		}
	}, [apiData]);

	return { error, isLoading, openData };
}
