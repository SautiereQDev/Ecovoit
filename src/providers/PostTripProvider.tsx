import React, {
	createContext,
	ReactNode,
	useContext,
	useMemo,
	useState,
} from 'react';
import { EVAPI } from '@ecovoit-api/mock-adapter';

interface PostTripContextType {
	postTripQuery: EVAPI.TripCreation;
	setPostTripQuery: React.Dispatch<React.SetStateAction<EVAPI.TripCreation>>;
}

const PostTripContext = createContext<PostTripContextType | undefined>(
	undefined
);

export const PostTripProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const initialState: EVAPI.TripCreation = {
		vehicle: '',
		seats: 0,
		description: null,
		datetime: 0,
		points: [],
	};

	const [postTripQuery, setPostTripQuery] =
		useState<EVAPI.TripCreation>(initialState);

	const value: PostTripContextType = useMemo(
		() => ({
			postTripQuery,
			setPostTripQuery,
		}),
		[postTripQuery]
	);

	return (
		<PostTripContext.Provider value={value}>
			{children}
		</PostTripContext.Provider>
	);
};

export const usePostTrip = (): PostTripContextType => {
	const context = useContext(PostTripContext);
	if (!context) {
		throw new Error(
			'useRegisterContext must be used within a PostTripProvider'
		);
	}
	return context;
};
