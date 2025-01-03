import axios from 'axios';
import { useEffect, useState } from 'react';

export function useAxiosGet<T>(url: string): [boolean, any, T | null] {
	const [apiData, setApiData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const res = await axios.get(url);
				const data = res.data;

				// @ts-ignore
				setApiData(data);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			} catch (error: any) {
				setError(error);
			}
		};
		fetchData();
	}, [url]);

	return [isLoading, error, apiData];
}
