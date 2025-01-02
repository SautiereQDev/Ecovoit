import React, {
	createContext,
	ReactNode,
	useContext,
	useMemo,
	useState,
} from 'react';
import { PostTripType } from '@/types';

interface PostTripProviderContextType {
	registerQuery: PostTripType;
	setRegisterQuery: React.Dispatch<React.SetStateAction<PostTripType>>;
}

const PostTripProviderContext = createContext<
	PostTripProviderContextType | undefined
>(undefined);

export const PostTripProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const initialState: PostTripType = {
		datetime: 0,
		description: undefined,
		points: [],
		seats: 0,
		vehicle: '',
	};

	const [registerQuery, setRegisterQuery] =
		useState<PostTripType>(initialState);

	const value: PostTripProviderContextType = useMemo(
		() => ({ registerQuery, setRegisterQuery }),
		[registerQuery]
	);

	return (
		<PostTripProviderContext.Provider value={value}>
			{children}
		</PostTripProviderContext.Provider>
	);
};

export const useRegisterContext = (): PostTripProviderContextType => {
	const context = useContext(PostTripProviderContext);
	if (!context) {
		throw new Error('use must be used within a RegisterProvider');
	}
	return context;
};
