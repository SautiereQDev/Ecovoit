import mockService from '@/src/mock/mockService';
import { createContext, PropsWithChildren, useEffect } from 'react';

const MockServiceContext = createContext(null);

export function MockServiceProvider({ children }: PropsWithChildren) {
	useEffect(() => {
		mockService();
	}, []);

	return (
		<MockServiceContext.Provider value={null}>
			{children}
		</MockServiceContext.Provider>
	);
}
