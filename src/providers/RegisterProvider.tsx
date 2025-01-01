import React, {
	createContext,
	ReactNode,
	useContext,
	useMemo,
	useState,
} from 'react';
import { PostUsersType } from '@/types';

interface RegisterContextType {
	searchQuery: PostUsersType;
	setSearchQuery: React.Dispatch<React.SetStateAction<PostUsersType>>;
}

const RegisterContext = createContext<RegisterContextType | undefined>(
	undefined
);

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const initialState: PostUsersType = {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		bio: '',
	};

	const [searchQuery, setSearchQuery] = useState<PostUsersType>(initialState);

	const value: RegisterContextType = useMemo(
		() => ({ searchQuery, setSearchQuery }),
		[searchQuery]
	);

	return (
		<RegisterContext.Provider value={value}>
			{children},
		</RegisterContext.Provider>
	);
};

export const useSearchContext = (): RegisterContextType => {
	const context = useContext(RegisterContext);
	if (!context) {
		throw new Error('useSearchContext must be used within a RegisterProvider');
	}
	return context;
};
