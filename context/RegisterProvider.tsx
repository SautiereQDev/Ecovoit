import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { router } from 'expo-router';
import {
	initialRegisterState,
	registerReducer,
} from '@/reducers/registerReducer';
import { PageNumber, PartialUser } from '@/types/register';
import { validateField } from '@/utils/validation';
import { FieldValue, ValidationErrors } from '@/types';

interface RegisterContextType {
	form: PartialUser;
	errors: ValidationErrors; // Update this line
	isValid: boolean;
	currentPage: number;
	updateField: (field: keyof PartialUser, value: any) => void;
	validateField: (field: keyof PartialUser, value: any) => void;
	validatePage: (page: PageNumber) => boolean;
	submitForm: () => void;
	resetForm: () => void;
	clearErrors: () => void;
}

const RegisterContext = createContext<RegisterContextType | undefined>(
	undefined
);

export function RegisterProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [state, dispatch] = useReducer(registerReducer, initialRegisterState);

	// Actions mémorisées
	const actions = useMemo(
		() => ({
			updateField: (field: keyof PartialUser, value: any) => {
				dispatch({ type: 'UPDATE_FIELD', field, value });
				const error = validateField(field, value);
				dispatch({ type: 'VALIDATE_FIELD', field, error });
			},

			validateField: (field: keyof PartialUser, value: any) => {
				const error = validateField(field, value);
				dispatch({ type: 'VALIDATE_FIELD', field, error });
			},

			validatePage: (page: PageNumber) => {
				const fieldsToValidate = Object.keys(
					state.form
				) as (keyof PartialUser)[];
				const isValid = fieldsToValidate.every((field) => {
					const error = validateField(field, state.form[field] as FieldValue);
					dispatch({ type: 'VALIDATE_FIELD', field, error });
					return !error;
				});
				if (isValid) {
					dispatch({ type: 'SET_PAGE', page: page + 1 });
					// @ts-ignore
					router.push(`/register/step${page + 1}`);
				}
				return isValid;
			},

			submitForm: () => {
				const fieldsToValidate = Object.keys(
					state.form
				) as (keyof PartialUser)[];
				const isValid = fieldsToValidate.every((field) => {
					const error = validateField(field, state.form[field] as FieldValue);
					dispatch({ type: 'VALIDATE_FIELD', field, error });
					return !error;
				});
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
