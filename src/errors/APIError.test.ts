import { EVAPI } from '@ecovoit-api/mock-adapter';
import { APIError } from './APIError';

describe('APIError', () => {
	it('should create an instance of APIError with correct properties', () => {
		const errorData: EVAPI.Error = {
			type: 'https://example.com/probs/out-of-credit',
			title: 'You do not have enough credit.',
			status: 402,
			detail: 'Your current balance is 30, but that costs 50.',
			instance: '/account/12345/msgs/abc',
		};

		const apiError = new APIError(errorData);

		expect(apiError).toBeInstanceOf(APIError);
		expect(apiError.type).toBe(errorData.type);
		expect(apiError.title).toBe(errorData.title);
		expect(apiError.status).toBe(errorData.status);
		expect(apiError.detail).toBe(errorData.detail);
		expect(apiError.instance).toBe(errorData.instance);
	});

	it('should return a correct string representation', () => {
		const errorData: EVAPI.Error = {
			type: 'https://example.com/probs/out-of-credit',
			title: 'You do not have enough credit.',
			status: 402,
			detail: 'Your current balance is 30, but that costs 50.',
			instance: '/account/12345/msgs/abc',
		};

		const apiError = new APIError(errorData);
		const expectedString = `type: ${errorData.type}, title: ${errorData.title}, status: ${errorData.status}, detail: ${errorData.detail}, instance: ${errorData.instance}`;

		expect(apiError.toString()).toBe(expectedString);
	});

	it('should return a correct JSON representation', () => {
		const errorData: EVAPI.Error = {
			type: 'https://example.com/probs/out-of-credit',
			title: 'You do not have enough credit.',
			status: 402,
			detail: 'Your current balance is 30, but that costs 50.',
			instance: '/account/12345/msgs/abc',
		};

		const apiError = new APIError(errorData);

		expect(apiError.toJSON()).toEqual(errorData);
	});

	it('should handle missing properties gracefully', () => {
		const errorData: Partial<EVAPI.Error> = {
			type: 'https://example.com/probs/out-of-credit',
			title: 'You do not have enough credit.',
		};

		const apiError = new APIError(errorData as EVAPI.Error);

		expect(apiError.type).toBe(errorData.type);
		expect(apiError.title).toBe(errorData.title);
		expect(apiError.status).toBeUndefined();
		expect(apiError.detail).toBeUndefined();
		expect(apiError.instance).toBeUndefined();
	});
});
