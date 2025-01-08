import React, {
	createContext,
	ReactNode,
	useContext,
	useMemo,
	useState,
} from 'react';
import { RegisterForm } from '@/types/forms';

interface RegisterContextType {
	registerQuery: RegisterForm;
	setRegisterQuery: React.Dispatch<React.SetStateAction<RegisterForm>>;
}

const RegisterContext = createContext<RegisterContextType | undefined>(
	undefined
);

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const initialState: RegisterForm = {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		bio: '',
		label: '',
		consumption: 0,
		emission: 0,
	};

	const [registerQuery, setRegisterQuery] =
		useState<RegisterForm>(initialState);

	const value: RegisterContextType = useMemo(
		() => ({ registerQuery, setRegisterQuery }),
		[registerQuery]
	);

	return (
		<RegisterContext.Provider value={value}>
			{children}
		</RegisterContext.Provider>
	);
};

export const useRegisterContext = (): RegisterContextType => {
	const context = useContext(RegisterContext);
	if (!context) {
		throw new Error(
			'useRegisterContext must be used within a RegisterProvider'
		);
	}
	return context;
};
