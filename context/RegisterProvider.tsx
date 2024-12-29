import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { useSharedState } from '@/hooks/useSharedState';
import { userService } from '@/services/sharedServices';
import { PageNumber, PartialUser, ValidationErrors } from '@/types';
import { useRegisterValidation } from '@/hooks';

interface RegisterContextType {
	state: PartialUser;
	updateField: (field: keyof PartialUser, value: any) => void;
	errors: ValidationErrors;
	validatePage: (page: PageNumber) => boolean;
	submitForm: () => void;
}

const RegisterContext = createContext<RegisterContextType | undefined>(
	undefined
);

interface RegisterProviderProps {
	children: ReactNode;
}

export const RegisterProvider = ({ children }: RegisterProviderProps) => {
	const { state, updateState } = useSharedState(userService);
	const { validateField, validatePage } = useRegisterValidation();
	const [errors, setErrors] = useState<ValidationErrors>({});

	const updateField = useCallback(
		(field: keyof PartialUser, value: any) => {
			const error = validateField(field, value) ?? undefined;
			setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
			updateState({ [field]: value }).catch((error: any) => {
				console.error('Error updating field:', error);
			});
		},
		[updateState, validateField]
	);

	const submitForm = useCallback(async () => {
		try {
			await userService.updateState(state);
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	}, [state]);

	const contextValue: RegisterContextType = useMemo(
		() => ({
			state,
			updateField,
			errors,
			validatePage: (page: PageNumber) => validatePage(page, state),
			submitForm,
		}),
		[state, updateField, errors, validatePage, submitForm]
	);

	return (
		<RegisterContext.Provider value={contextValue}>
			{children}
		</RegisterContext.Provider>
	);
};

export const useRegister = () => {
	const context = useContext(RegisterContext);
	if (!context) {
		throw new Error('useRegister must be used within a RegisterProvider');
	}
	return context;
};
