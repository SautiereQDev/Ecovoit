import axios from 'axios';
import { apiGet } from '@/api/client';

jest.mock('axios');

describe('apiGet', () => {
	const url = '/vehicles';
	const responseData = [
		{ id: '1', label: 'Car 1' },
		{ id: '2', label: 'Car 2' },
	];

	beforeEach(() => {
		(axios.get as jest.Mock).mockClear();
		axios.defaults.baseURL = 'https://api-ev-qq.pimous.dev'; // Assurez-vous que defaults est défini
	});

	it('fetches data successfully', async () => {
		(axios.get as jest.Mock).mockResolvedValue({ data: responseData });

		const result = await apiGet(url);

		expect(result).toEqual(responseData);
		expect(axios.get).toHaveBeenCalledWith(
			'https://api-ev-qq.pimous.dev/vehicles',
			{ params: {} }
		);
	});

	it('handles errors when fetching data', async () => {
		const error = new Error('Failed to fetch data');
		(axios.get as jest.Mock).mockRejectedValue(error);

		await expect(apiGet(url)).rejects.toThrow('Failed to fetch data');
	});
});
