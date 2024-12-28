import React, { createContext, useReducer, useContext, useMemo } from 'react';
import { router } from 'expo-router';
import {
	registerReducer,
	initialRegisterState,
} from '@/reducers/registerReducer';
import { FormType, PageNumber } from '@/types/register';
import { validateField, validatePageFields } from '@/utils/validation';

interface RegisterContextType {
	form: FormType;
	errors: Record<string, string>;
	isValid: boolean;
	currentPage: number;
	updateField: (field: keyof FormType, value: any) => void;
	validatePage: (page: PageNumber) => boolean;
	submitForm: () => void;
	resetForm: () => void;
	clearErrors: () => void;
}

const RegisterContext = createContext<RegisterContextType | undefined>(
	undefined
);

export function RegisterProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(registerReducer, initialRegisterState);

	// Actions mémorisées
	const actions = useMemo(
		() => ({
			updateField: (field: keyof FormType, value: any) => {
				dispatch({ type: 'UPDATE_FIELD', field, value });
				const error = validateField(field, value);
				dispatch({ type: 'VALIDATE_FIELD', field, error });
			},

			validatePage: (page: PageNumber) => {
				const isValid = validatePageFields(page, state.form);
				if (isValid) {
					dispatch({ type: 'SET_PAGE', page: page + 1 });
					router.push(`/register/step${page + 1}`);
				}
				return isValid;
			},

			submitForm: () => {
				const isValid = [1, 2, 3, 4].every((page) =>
					validatePageFields(page as PageNumber, state.form)
				);
				if (isValid) {
					dispatch({ type: 'SUBMIT_FORM' });
					// Logique d'envoi du formulaire
					console.log('Form submitted:', state.form);
					router.push('/');
				}
			},

			resetForm: () => dispatch({ type: 'RESET_FORM' }),

			clearErrors: () => dispatch({ type: 'CLEAR_ERRORS' }),
		}),
		[state.form]
	);

	const value = useMemo(
		() => ({
			form: state.form,
			errors: state.errors,
			isValid: state.isValid,
			currentPage: state.currentPage,
			...actions,
		}),
		[state, actions]
	);

	return (
		<RegisterContext.Provider value={value}>
			{children}
		</RegisterContext.Provider>
	);
}

export function useRegister() {
	const context = useContext(RegisterContext);

	if (!context) {
		throw new Error('useRegister must be used within a RegisterProvider');
	}

	return context;
}
