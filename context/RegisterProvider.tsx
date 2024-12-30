import React, { createContext, ReactNode, useCallback, useContext, useMemo, useReducer } from 'react';
import { usersService } from '@/services';
import { FieldValue, PageNumber, User, ValidationErrors } from '@/types';
import { useSharedState } from '@/hooks/useSharedState';
import { initialRegisterState, registerReducer } from '@/reducers/registerReducer';
import { getPageFields, validateField } from '@/utils';

interface RegisterContextType {
	form: User;
	errors: ValidationErrors;
	currentPage: number;
	isSubmitting: boolean;
	updateField: (field: keyof User, value: any) => void;
	validatePage: (page: PageNumber) => boolean;
	submitForm: () => Promise<void>;
}

const RegisterContext = createContext<RegisterContextType | undefined>(
	undefined
);

export function RegisterProvider({
	children,
}: Readonly<{ children: ReactNode }>) {
	const [state, dispatch] = useReducer(registerReducer, initialRegisterState);
	const { updateState, postState } = useSharedState(usersService);

	const updateField = useCallback(
		async (field: keyof User, value: any) => {
			try {
				dispatch({ type: 'UPDATE_FIELD', field, value });
				const error = validateField(field, state.form[field] as FieldValue);
				if (error) {
					dispatch({
						type: 'SET_ERRORS',
						errors: error as unknown as ValidationErrors,
					});
				} else {
					dispatch({ type: 'CLEAR_ERRORS' });
				}
			} catch (err) {
				console.error('Error updating field:', err);
			}
		},
		[state.form]
	);

	const validatePage = useCal,lback(
		(page: PageNumber): boolean => {
			const fieldsToValidate = getPageFields(page);
			const errors: ValidationErrors = {};

			fieldsToValidate.forEach((field) => {
				const error = validateField(field, state.form[field] as FieldValue);
				if (error) {
					errors[field] = error;
				}
			});

			if (Object.keys(errors).length > 0) {
				dispatch({ type: 'SET_ERRORS', errors });
				return false;
			}

			dispatch({ type: 'SET_PAGE', page: page + 1 });
			return true;
		},
		[state.form]
	);

	const submitForm = useCallback(async () => {
		try {
			dispatch({ type: 'SET_SUBMITTING', value: true });

			// Final validation
			const isValid = [1, 2, 3, 4].every((page) =>
				validatePage(page as PageNumber),
			);

			if (!isValid) {
				dispatch({ type: 'SET_SUBMITTING', value: false });
				dispatch({ type: 'SET_VALID', value: false });
				throw new Error('Form validation failed');
			}

			// Send to API
			const response = (await postState(state.form)) as unknown as (
				| User
				| undefined
			)[];
			// Update global state
			await updateState(response);

			dispatch({ type: 'SET_SUBMITTING', value: false });
			dispatch({ type: 'SET_VALID', value: true });
		} catch (error) {
			dispatch({ type: 'SET_SUBMITTING', value: false });
			dispatch({
				type: 'SET_ERRORS',
				errors: { submit: 'Failed to submit form, error : ' + error },
			});
		}
	}, [postState, state.form, updateState, validatePage]);

	const value = useMemo(
		() => ({
			form: state.form,
			errors: state.errors,
			currentPage: state.currentPage,
			isSubmitting: state.isSubmitting,
			updateField,
			validatePage,
			submitForm,
		}),
		[state, updateField, validatePage, submitForm],
	);

	return (
		<RegisterContext.Provider value={value}>
			{children}
		</RegisterContext.Provider>
	);
}

export const useRegister = () => {
	const context = useContext(RegisterContext);
	if (!context) {
		throw new Error('useRegister must be used within RegisterProvider');
	}
	return context;
};
